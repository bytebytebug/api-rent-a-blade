import { RepositoryError } from "#core/rent/application/errors/repository";
import { BladeRepository } from "#core/rent/application/repository/blade";
import { Blade } from "#core/rent/domain/model/blade";
import { Description } from "#core/rent/domain/model/description";
import { Id } from "#core/rent/domain/model/id";
import { Name } from "#core/rent/domain/model/name";
import { Price } from "#core/rent/domain/model/price";
import { PrismaClient } from '@prisma/client'

export class BladeRepositoryPrisma implements BladeRepository {


    private client: PrismaClient;


    constructor(client: PrismaClient) {
        this.client = client;
    }


    async count(): Promise<number> {
        try {
            return await this.client.blade.count()
        } catch (e) {
            throw new RepositoryError()
        }
    }


    async create(blade: Blade): Promise<void> {
        try {
            await this.client.blade.create({
                data: {
                    id: blade.id.uuid,
                    name: blade.name.name,
                    description: blade.description.description,
                    price: blade.price.price,
                }
            })
        } catch (error) {
            throw new RepositoryError()
        }
    }


    async list(limit: number, offset: number): Promise<Blade[]> {
        try {
            let prismaBlades = await this.client.blade.findMany({
                take: limit,
                skip: offset,
            });

            let blades = prismaBlades.map(b => {
                return new Blade(
                    new Id(b.id),
                    new Name(b.name),
                    new Description(b.description),
                    new Price(b.price),
                )
            })

            return blades;
        } catch (error) {
            throw new RepositoryError()
        }
    }


    async find(id: Id): Promise<Blade | null> {
        try {
            let prismaBlade = await this.client.blade.findUnique({
                where: {
                    id: id.uuid,
                }
            })

            if (prismaBlade == null) return null;

            return new Blade(
                new Id(prismaBlade.id),
                new Name(prismaBlade.name),
                new Description(prismaBlade.description),
                new Price(prismaBlade.price),
            )

        } catch (error) {
            throw new RepositoryError()
        }
    }


    async update(blade: Blade): Promise<void> {
        try {
            await this.client.blade.update({
                data: {
                    name: blade.name.name,
                    description: blade.description.description,
                    price: blade.price.price,
                },
                where: {
                    id: blade.id.uuid,
                },
            })
        } catch (error) {
            throw new RepositoryError()
        }
    }


    async delete(blade: Blade): Promise<void> {
        try {
            await this.client.blade.delete({
                where: {
                    id: blade.id.uuid,
                }
            })
        } catch (error) {
            throw new RepositoryError()
        }
    }

}