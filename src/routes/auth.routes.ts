import { Router } from 'express';
import AuthDto from '../dtos/authDto';
import AuthUserUseCase from '../useCases/auth/authUserUseCase';

const authRoutes = Router();

authRoutes.post('/', async (request, response) => {
    const useCase = new AuthUserUseCase();
    const authResponse = await useCase.execute(request.body as AuthDto);
    return response.send(authResponse);
});

export default authRoutes;
