import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entities/contact.entity";
import { Repository } from "typeorm";
import { CreateContactDto } from "./dto/create-contact.dto";


@Injectable()
export class ContactsService{
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ){}

  async create(CreateContactDto: CreateContactDto): Promise<Contact>{
    const contact = this.contactRepository.create(CreateContactDto);

    return this.contactRepository.save(contact)
  }
}