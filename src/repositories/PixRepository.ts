import { EntityRepository, Repository } from "typeorm";
import { Pix } from "../entities/Pix";

@EntityRepository(Pix)
class PixRepository extends Repository<Pix>{}

export{ PixRepository }