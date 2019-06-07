import { SAVE_CONTENT } from './types';

export const saveContent = contentList => {
    return {
        type: SAVE_CONTENT,
        payload: contentList
    }
}