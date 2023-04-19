import { genSalt, hash } from 'bcrypt';

const hasher = async(password) => {

    const salt = 10;

    const passswordHashed = await hash(password, salt);

    return passswordHashed;
}

export {
    hasher
}