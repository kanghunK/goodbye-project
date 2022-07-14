import { Model, model } from 'mongoose';
import { IComment } from '../schemas/comment-schema';
import { RemembranceSchema, IRemembrance } from '../schemas/remembrance-schema';

export interface IUpdateRemembrance {
    fullName?: string;
    dateOfBirth?: string;
    dateOfDeath?: string;
    isPublic?: boolean;
    photo?: string;
    comments?: Array<IComment>;
}

export class RemembranceModel {
    Remembrance: Model<IRemembrance>;

    constructor() {
        this.Remembrance = model<IRemembrance>(
            'remembrances',
            RemembranceSchema,
        );
    }

    // 새 추모 데이터 생성
    async create(remembranceInfo: IRemembrance) {
        const createdNewRemembrance = await this.Remembrance.create(
            remembranceInfo,
        );

        return createdNewRemembrance;
    }

    // 최근 업데이트 추모 조회
    async findRecent(count: number) {
        const recentRemembrances = await this.Remembrance.find()
            .sort({ updatedAt: -1 })
            .limit(count);

        return recentRemembrances;
    }

    // objectId를 이용해 특정 추모 조회
    async findById(remembranceId: string) {
        const remembrance = await this.Remembrance.findOne({
            _id: remembranceId,
        });

        return remembrance;
    }

    // 추모 데이터 수정
    async update(remembranceId: string, update: IUpdateRemembrance) {
        const filter = { _id: remembranceId };
        const option = { returnOriginal: false };

        const updatedRemembrance = await this.Remembrance.findOneAndUpdate(
            filter,
            update,
            option,
        );

        return updatedRemembrance;
    }
}

const remembranceModel = new RemembranceModel();

export { remembranceModel };
