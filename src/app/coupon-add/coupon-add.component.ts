import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { CupomItem } from '../interfaces/cupom-item';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss']
})
export class CouponAddComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl('', Validators.required),
    tagDeUso: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    campanhaPertence: new FormControl('', Validators.required),
    valorMinimoUso: new FormControl(),
    tipoDesconto: new FormControl('porcentagem', Validators.required),
    valorDeDesconto: new FormControl('', Validators.required),
    dataDeValidade: new FormControl('', Validators.required),
    produtosPertencentes: new FormControl(),
    totalLiberados: new FormControl(),
    criadoPorUsuario: new FormControl('admin'),
    status: new FormControl('ativo', Validators.required),
  })

  constructor(
    private router: Router,
  ) { }

  localStorageEntrys: CupomItem[] = [];
  ngOnInit() {
    this.localStorageEntrys = JSON.parse(window.localStorage.getItem('jsonData')) || []
    console.log(this.localStorageEntrys)
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


  }

  submitForm() {
    if (this.form.valid) {
      let totalLiberados = this.form.get('totalLiberados').value
      let quantidadeUsados = Math.floor(Math.random() * totalLiberados);
      this.localStorageEntrys.push(
        {
          id: this.form.get('id').value,
          tagDeUso: this.form.get('tagDeUso').value,
          nome: this.form.get('nome').value,
          campanhaPertence: {
            id: this.form.get('campanhaPertence').value['id'],
            nome: this.form.get('campanhaPertence').value['nome']
          },
          valorMinimoUso: this.form.get('valorMinimoUso').value,
          tipoDesconto: this.form.get('tipoDesconto').value,
          valorDeDesconto: this.form.get('tipoDesconto').value === 'fixo' ? this.form.get('valorDeDesconto').value : this.form.get('valorDeDesconto').value / 100,
          dataDeValidade: this.form.get('dataDeValidade').value,
          totalLiberados: totalLiberados,
          quantidadeUsados: quantidadeUsados,
          quantidadeDisponivel: totalLiberados - quantidadeUsados,
          criadoPorUsuario: this.form.get('criadoPorUsuario').value,
          status: this.form.get('status').value,
          dataCriacao: new Date(),
        }
      )
      console.log(this.localStorageEntrys)
      window.localStorage.setItem('jsonData', JSON.stringify(this.localStorageEntrys))

    }
  }

  refreshPage(){
      window.location.reload();
  }
}
