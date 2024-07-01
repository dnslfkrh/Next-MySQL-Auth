const createCode = async () => {
    const code = await Math.random().toString(36).substring(2, 8);
    return code;
};

export default createCode;