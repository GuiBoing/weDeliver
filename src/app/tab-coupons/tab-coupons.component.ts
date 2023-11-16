import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { CupomItem } from '../interfaces/cupom-item';
declare let ApexCharts: any;

@Component({
  selector: 'app-tab-coupons',
  templateUrl: './tab-coupons.component.html',
  styleUrls: ['./tab-coupons.component.scss']
})
export class TabCouponsComponent implements OnInit {

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }
  cuponsArray: CupomItem[];
  ngOnInit(): void {
    this.cuponsArray = JSON.parse(window.localStorage.getItem("jsonData")) || [];
    this.generateChartPorCategoria()
    this.generateChartExpiradosAtivo()
  }

  generateChartPorCategoria() {
    const countByCampanha = this.contarCuponsPorCampanha(this.cuponsArray);

    const campanhaLabels = countByCampanha.map(campanha => campanha.nome);
    const campanhaSeries = countByCampanha.map(campanha => campanha.quantidade);

    let optionsChartPorCategoria: ApexOptions = {
      title: { text: 'Distribuição de Cupons por Campanha' },
      series: campanhaSeries,
      chart: {
        width: '100%',
        height: 500,
        type: 'pie',
        toolbar: { show: false }
      },
      legend: {
        position: 'bottom'
      },
      labels: campanhaLabels,
    };

    var chartPorCategoria = new ApexCharts(document.querySelector("#chartPorCategoria"), optionsChartPorCategoria);
    chartPorCategoria.render();
    this.cd.detectChanges();
  }

  contarCuponsPorCampanha(cupons: CupomItem[]): { nome: string, quantidade: number }[] {
    const countByCampanha: { [key: string]: number } = {};

    cupons.forEach(cupom => {
      const campanhaNome = cupom.campanhaPertence.nome;

      if (countByCampanha[campanhaNome] === undefined) {
        countByCampanha[campanhaNome] = 1;
      } else {
        countByCampanha[campanhaNome]++;
      }
    });

    return Object.keys(countByCampanha).map(nome => ({ nome, quantidade: countByCampanha[nome] }));
  }

  generateChartExpiradosAtivo() {
    const countAtivosExpirados = this.contarAtivosExpirados(this.cuponsArray);

    const labels = ['Ativos', 'Expirados'];
    const series = [countAtivosExpirados.ativos, countAtivosExpirados.inativos];

    let optionsChartExpiradosAtivo: ApexOptions = {
      title: { text: 'Cupons Ativos vs. Expirados' },
      series: series,
      chart: {
        width: '100%',
        height: 500,
        type: 'pie',
        toolbar: { show: false }
      },
      legend: {
        position: 'bottom'
      },
      labels: labels,
    };

    var chartExpiradosAtivo = new ApexCharts(document.querySelector("#chartExpiradosAtivo"), optionsChartExpiradosAtivo);
    chartExpiradosAtivo.render();
    this.cd.detectChanges();
  }

  contarAtivosExpirados(cupons): { ativos: number, inativos: number } {
    const countAtivosExpirados = { ativos: 0, inativos: 0 };

    cupons.forEach(cupom => {
      if (cupom.status === 'ativo') {
        countAtivosExpirados.ativos++;
      } else {
        countAtivosExpirados.inativos++;
      }
    });

    return countAtivosExpirados;
  }

}





