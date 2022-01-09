import { Request, Response } from 'express';
import ShowAllTagsService from 'services/tags/ShowAllTagsService';
import ShowOneTagService from 'services/tags/ShowOneTagService';

export default class TagsController {
  async get(request: Request, response: Response): Promise<Response> {
    const { tagId } = request.params;

    const showOneTagService = new ShowOneTagService();
    const tag = await showOneTagService.exec(tagId);

    return response.status(200).json(tag);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const showAllTagsService = new ShowAllTagsService();
    const tags = await showAllTagsService.exec();

    return response.status(200).json(tags);
  }
}
