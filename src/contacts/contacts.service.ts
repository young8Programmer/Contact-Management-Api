import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entities/contact.entity";
import { Repository } from "typeorm";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";


@Injectable()
export class ContactsService{
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ){}

  async create(createContactDto: CreateContactDto): Promise<Contact>{
    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact)
  }

  async findAll(): Promise<Contact[]>{
    return this.contactRepository.find({
      order: {name: "ASC"},
    });
  }

  async findOne(id: number): Promise<Contact>{
    const contact = await this.contactRepository.findOne({where: {id}});
    if(!contact){
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: number, UpdateContactDto: UpdateContactDto): Promise<Contact>{
    const contact = await this.findOne(id);
    Object.assign(contact, UpdateContactDto);
    return this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<void>{
    const contact = await this.findOne(id);
    await this.contactRepository.remove(contact);
  }
}