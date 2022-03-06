import { Router } from 'express';
import TagsController from '../controller/TagsController';

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.get('/:tagId/', tagsController.get);
tagsRouter.get('/', tagsController.getAll);

export default tagsRouter;
