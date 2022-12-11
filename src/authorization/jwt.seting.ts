export const jwtConfig: any = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: { expiresIn: process.env.EXPARED_TOKEN || '3600s' },
};
