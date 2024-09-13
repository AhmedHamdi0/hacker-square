import { ExpressHandler, User } from '../types';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { db } from '../datastore/Datastore';
import crypto from 'crypto';
import { signJwt } from '../auth';


export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (request, response) => {
    const {firstName, lastName, username, password, email} = request.body;
    if (!firstName || !lastName || !username || !password || !email)
        return response.status(400).send({error: 'All fields are required!'});

    const existingUser: User | undefined = (await db.getUserByEmail(email) || await db.getUserByUsername(username));
    if (existingUser)
        return response.status(403).send({error: 'User already exists!'});

    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        username,
        email,
        password: hashPassword(password),
    };

    await db.createUser(user);
    const jwt = signJwt({userId: user.id});
    return response.status(200).send({jwt});
};

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (request, response) => {
    const {login, password} = request.body;
    if (!login || !password)
        return response.sendStatus(400);

    const existingUser: User | undefined = (await db.getUserByEmail(login) || await db.getUserByUsername(login));
    if (!existingUser || existingUser.password !== hashPassword(password)) {
        return response.sendStatus(403);

    }

    const jwt = signJwt({userId: existingUser.id});
    return response.status(200).send({
        user: {
            id: existingUser.id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.username,
            email: existingUser.email,
        },
        jwt,
    });
};


function hashPassword(password: string): string {
    // @ts-ignore
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, parseInt(process.env.HASH_ITERATIONS), parseInt(process.env.KEY_LEN),
        'sha512').toString('hex');
}
