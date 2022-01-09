import TagsController from 'controller/TagsController';
import { Router } from 'express';

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.get('/:tagId/', tagsController.get);
tagsRouter.get('/', tagsController.getAll);

export default tagsRouter;
