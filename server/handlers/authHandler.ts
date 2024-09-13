import { ExpressHandler, User } from '../types';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { db } from '../datastore/Datastore';
import crypto from 'crypto';


export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (request, response) => {
    const {firstName, lastName, username, password, email} = request.body;
    if (!firstName || !lastName || !username || !password || !email)
        return response.status(400).send('All fields are required!')

    const existingUser: User | undefined = (await db.getUserByEmail(email) || await db.getUserByUsername(username))
    if (existingUser)
        return response.status(403).send('User already exists!')

    const user: User = {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        username,
        email,
        password
    }

    await db.createUser(user);
    return response.sendStatus(200);
}

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (request, response) => {
    const {login, password} = request.body;
    if (!login || !password)
        return response.sendStatus(400);

    const existingUser: User | undefined = (await db.getUserByEmail(login) || await db.getUserByUsername(login))
    if (!existingUser || existingUser.password !== password)
        return response.sendStatus(403);

    return response.status(200).send({
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        username: existingUser.username,
        email: existingUser.email
    })
}