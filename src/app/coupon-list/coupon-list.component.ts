import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CupomItem } from '../interfaces/cupom-item'
declare var bootstrap: any;
@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})



export class CouponListComponent implements OnInit {
  cuponsArray: CupomItem[];
  constructor(
  ) { }
  orderRule = { column: 'dataDeValidade', isAsc: true }
  tableConfig = new FormGroup({
    nome: new FormControl(true),
    campanhaPertence: new FormControl(true),
    status: new FormControl(true),
    valorMinimoUso: new FormControl(true),
    tipoDesconto: new FormControl(false),
    valorDeDesconto: new FormControl(true),
    dataDeValidade: new FormControl(true),
    produtosPertencentes: new FormControl(false),
    totalLiberados: new FormControl(true),
    quantidadeDisponivel: new FormControl(false),
    quantidadeUsados: new FormControl(true),
    criadoPorUsuario: new FormControl(true),
  })

  ngOnInit() {
    this.cuponsArray = JSON.parse(window.localStorage.getItem('jsonData')) || []

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }

  changeTableConfig(column: string) {
    this.tableConfig.get(column).setValue(!this.tableConfig.get(column).value)
  }

  orderBy(column: string) {
    if (this.orderRule.column.toString() === column.toString()) {
      this.orderRule.isAsc = !this.orderRule.isAsc
    } else {
      this.orderRule.column = column;
      this.orderRule.isAsc = true
    }
  }
  sorter() {
    const getPropertyValue = (obj, path) => {
      return path.split('.').reduce((acc, prop) => (acc && acc[prop]) ? acc[prop] : undefined, obj);
    };

    this.cuponsArray.sort((a, b) => {
      const propA = getPropertyValue(a, this.orderRule.column);
      const propB = getPropertyValue(b, this.orderRule.column);

      // Lida com casos onde propA ou propB podem ser undefined
      if (propA === undefined) return 1;
      if (propB === undefined) return -1;

      let result;
      if (this.orderRule.isAsc) {
        result = propA > propB ? 1 : propA === propB ? 0 : -1;
      } else {
        result = propA < propB ? 1 : propA === propB ? 0 : -1;
      }

      return result;
    });

    return this.cuponsArray;
  }


  changeStatus(couponId: number) {
    const index = this.cuponsArray.findIndex(cupom => cupom.id === couponId);

    if (index !== -1) {
      this.cuponsArray[index].status === 'ativo' ? this.cuponsArray[index].status = 'desativado' : this.cuponsArray[index].status = 'ativo';
      window.localStorage.setItem('jsonData', JSON.stringify(this.cuponsArray))
    }
  }

  delete(couponId: number) {
    const index = this.cuponsArray.findIndex(cupom => cupom.id === couponId);

    if (index !== -1) {
      this.cuponsArray.splice(index, 1);
      window.localStorage.setItem('jsonData', JSON.stringify(this.cuponsArray))
    }
  }


}
