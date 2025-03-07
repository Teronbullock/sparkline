import dbConnect from '@lib/database';
import User from '@lib/models/user-model';
import { NextResponse } from 'next/server';

interface IpostUserLogin {
  email: string;
  password: string;
}

export async function postUserLogin(data: IpostUserLogin) {
  try {
    // check the db once per request
    // check the db connection
    await dbConnect();

    console.log('test login post', data);

    const users = await User.findOne({
      email: data.email,
      password: data.password,
    }).exec();

    console.log('users', users);
    // return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error('ERROR:', err);
    return NextResponse.json({ message: 'Error retrieving users' }, { status: 500 });
  }
}

export async function createUser(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.log('ERROR:', err);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
