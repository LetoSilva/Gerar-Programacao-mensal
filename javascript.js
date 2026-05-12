const Scheduler = {
    rodizio: [
        { email:"Leila", retorno:"Adri", fieldglass:"Adri", fup:"Leto", service:"Leto", v360:"Adri", encerramento:"Adri" },
        { email:"Leto", retorno:"Leila", fieldglass:"Leila", fup:"Adri", service:"Adri", v360:"Leila", encerramento:"Leila" },
        { email:"Adri", retorno:"Leto", fieldglass:"Leto", fup:"Leila", service:"Leila", v360:"Leto", encerramento:"Leto" }
    ],
    dataBase: new Date(2026, 4, 4), // 04/05/2026

    obterIndiceParaData(dataAlvo, ano) {
        let count = 0;
        let d = new Date(this.dataBase);
        const feriados = Holidays.obter(ano);
        const feriadosDatas = Object.keys(feriados);

        if (dataAlvo < this.dataBase) return 0;
        
        while (d < dataAlvo) {
            const semana = d.getDay();
            const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (semana !== 0 && semana !== 6 && !feriadosDatas.includes(iso)) count++;
            d.setDate(d.getDate() + 1);
        }
        return count;
    }
};

const Holidays = {
    formatar(data) { return data.toISOString().split('T')[0]; },
    calcularPascoa(ano) {
        const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100,
              d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
              g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
              i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7,
              m = Math.floor((a + 11 * h + 22 * l) / 451);
        return new Date(ano, Math.floor((h + l - 7 * m + 114) / 31) - 1, ((h + l - 7 * m + 114) % 31) + 1);
    },
    obter(ano) {
        const p = this.calcularPascoa(ano);
        const s = new Date(p); s.setDate(p.getDate() - 2); // Sexta Santa
        const c = new Date(p); c.setDate(p.getDate() + 60); // Corpus Christi
        const cn = new Date(ano, 10, 20); // Consciência Negra (20/11)

        const lista = {};
        lista[`${ano}-01-01`] = "Ano Novo";
        lista[`${ano}-04-21`] = "Tiradentes";
        lista[`${ano}-05-01`] = "Dia do Trabalho";
        lista[`${ano}-09-07`] = "Independência";
        lista[`${ano}-10-12`] = "Nsa. Sra. Aparecida";
        lista[`${ano}-11-02`] = "Finados";
        lista[`${ano}-11-15`] = "Proclamação da República";
        lista[`${ano}-11-20`] = "Consciência Negra";
        lista[`${ano}-12-25`] = "Natal";
        lista[this.formatar(s)] = "Sexta-Feira Santa";
        lista[this.formatar(c)] = "Corpus Christi";

        return lista;
    }
};

const App = {
    meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    init() {
        const selMes = document.getElementById("mes");
        selMes.innerHTML = this.meses.map((m, i) => `<option value="${i}">${m}</option>`).join("");
        selMes.value = new Date().getMonth();
        selMes.addEventListener("change", () => this.gerarMes());
        document.getElementById("ano").addEventListener("change", () => this.gerarMes());
        this.gerarMes();
    },
    classe(n) { return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); },
    gerarMes() {
        const tbody = document.getElementById("tbodyProgramacao");
        tbody.innerHTML = "";
        const mes = parseInt(document.getElementById("mes").value);
        const ano = parseInt(document.getElementById("ano").value);
        const feriadosMap = Holidays.obter(ano);
        const feriadosDatas = Object.keys(feriadosMap);
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();
        
        let uteis = 0, fers = 0;

        for (let d = 1; d <= ultimoDia; d++) {
            const data = new Date(ano, mes, d);
            const semana = data.getDay();
            if (semana === 0 || semana === 6) continue;

            const iso = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const tr = document.createElement("tr");

            if (feriadosDatas.includes(iso)) {
                fers++;
                tr.className = "feriado";
                tr.innerHTML = `<td>${data.toLocaleDateString('pt-BR')}</td><td colspan="7">FERIADO: ${feriadosMap[iso]}</td>`;
            } else {
                const indiceReal = Scheduler.obterIndiceParaData(data, ano);
                const r = Scheduler.rodizio[indiceReal % 3];
                tr.innerHTML = `
                    <td>${data.toLocaleDateString('pt-BR')}</td>
                    <td class="${this.classe(r.email)}">${r.email}</td>
                    <td class="${this.classe(r.retorno)}">${r.retorno}</td>
                    <td class="${this.classe(r.fieldglass)}">${r.fieldglass}</td>
                    <td class="${this.classe(r.fup)}">${r.fup}</td>
                    <td class="${this.classe(r.service)}">${r.service}</td>
                    <td class="${this.classe(r.v360)}">${r.v360}</td>
                    <td class="${this.classe(r.encerramento)}">${r.encerramento}</td>`;
                uteis++;
                document.getElementById("ultimoEmail").innerText = r.email;
            }
            tbody.appendChild(tr);
        }
        
        document.getElementById("diasMes").innerText = uteis;
        document.getElementById("feriadosMes").innerText = fers;
        document.getElementById("labelFeriado").innerText = fers > 1 ? "Feriados" : "Feriado";
    },
    alternarTema() { document.body.classList.toggle("dark"); },
    exportarExcel() { XLSX.writeFile(XLSX.utils.table_to_book(document.getElementById("tabelaProgramacao")), "Escala_CAF.xlsx"); },
    exportarPDF() {
        const pdf = new jspdf.jsPDF('l');
        pdf.text("Escala CAF", 14, 10);
        pdf.autoTable({ html: '#tabelaProgramacao', startY: 15, styles: {fontSize: 8} });
        pdf.save("Escala_CAF.pdf");
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());