import bcrypt from 'bcrypt';
import { IComment } from '../db/schemas/comment-schema';
import { commentModel, CommentModel, IUpdateComment } from '../db';

class CommentService {
    commentModel: CommentModel;

    constructor() {
        this.commentModel = commentModel;
    }

    // 새 추모글 생성
    async addComment(commentInfo: IComment) {
        const { password } = commentInfo;
        const hashedPassword = await bcrypt.hash(password as string, 10);

        const newInfo = {
            ...commentInfo,
            password: hashedPassword,
        };

        const comment = await this.commentModel.create(newInfo);

        return comment;
    }

    // 특정 추모글 조회
    async getCommentById(commentId: string) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new Error(
                '해당 추모 글은 존재하지 않습니다. 다시 확인해 주세요.',
            );
        }

        return comment;
    }

    // 추모글 수정
    async setCommet(
        commentId: string,
        currentPassword: string,
        update: IUpdateComment,
    ) {
        // 작성자 확인을 위해 해당 추모글의 비밀번호 조회
        const comment = await this.getCommentById(commentId);
        const hashedPassword = comment.password;

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            hashedPassword,
        );
        if (!isPasswordCorrect) {
            throw new Error(
                '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.',
            );
        }

        const updatedComment = await this.commentModel.update(
            commentId,
            update,
        );

        return updatedComment;
    }

    // 추모글 삭제
    async deleteComment(commentId: string, currentPassword: string) {
        // 작성자 확인을 위해 해당 추모글의 비밀번호 조회
        const comment = await this.getCommentById(commentId);
        const hashedPassword = comment.password;

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            hashedPassword,
        );
        if (!isPasswordCorrect) {
            throw new Error(
                '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.',
            );
        }

        const deletedComment = await this.commentModel.delete(commentId);

        return deletedComment;
    }
}

const commentService = new CommentService();

export { commentService };
