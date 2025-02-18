import { Controller, Get, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactRepository } from './contact.repository';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactRepository: ContactRepository) {}

  // @Post()
  // create(@Body() createContactDto: CreateContactDto) {
  //   return this.contactService.create(createContactDto);
  // }

  // @Get()
  // findAll() {
  //   return this.contactService.findAll();
  // }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    console.log('userId ===>', userId);
    const res =
      await this.contactRepository.findConversationsAndMessages(+userId);
    console.log('res ===>', res);
    return res;
  }

  @Get()
  async findAll() {
    console.log('hello');
    const res = await this.contactRepository.findAllConversationsAndMessages();
    return res;
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
  //   return this.contactService.update(+id, updateContactDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contactService.remove(+id);
  // }
}
