import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { TableMobileComponent } from './components/table-mobile/table-mobile.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { TagsFilterComponent } from './components/tags-filter/tags-filter.component';
registerLocaleData(ptBr);

const components = [
  CardComponent,
  HeaderComponent,
  TableComponent,
  SearchComponent,
  ModalComponent,
  TableMobileComponent,
  TagsFilterComponent
]
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    { provide: LOCALE_ID, useValue: 'pt-BR' }

  ],
  exports:components
})
export class SharedModule { }
