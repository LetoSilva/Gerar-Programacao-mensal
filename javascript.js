const Scheduler = {
    rodizio: [
        {
            email: "Leila",
            retorno: "Adri",
            fieldglass: "Leto",
            fup: "Leto",
            service: "Girlene",
            v360: "Leila",
            spot: "Adri",
            encerramento: "Adri"
        },
        {
            email: "Leto",
            retorno: "Leila",
            fieldglass: "Adri",
            fup: "Adri",
            service: "Girlene",
            v360: "Leto",
            spot: "Leila",
            encerramento: "Leila"
        },
        {
            email: "Adri",
            retorno: "Leto",
            fieldglass: "Leila",
            fup: "Leila",
            service: "Girlene",
            v360: "Adri",
            spot: "Leto",
            encerramento: "Leto"
        }
    ],

    dataBase: new Date(2026, 4, 4),

    obterIndiceParaData(dataAlvo, ano) {
        let count = 0;
        let d = new Date(this.dataBase);

        const feriados = Holidays.obter(ano);
        const feriadosDatas = Object.keys(feriados);

        while (d < dataAlvo) {

            const semana = d.getDay();

            const iso =
                `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

            if (
                semana !== 0 &&
                semana !== 6 &&
                !feriadosDatas.includes(iso)
            ) {
                count++;
            }

            d.setDate(d.getDate() + 1);
        }

        return count;
    }
};

const Holidays = {

    formatar(data) {
        return data.toISOString().split('T')[0];
    },

    calcularPascoa(ano) {

        const a = ano % 19;
        const b = Math.floor(ano / 100);
        const c = ano % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);

        return new Date(
            ano,
            Math.floor((h + l - 7 * m + 114) / 31) - 1,
            ((h + l - 7 * m + 114) % 31) + 1
        );
    },

    obter(ano) {

        const lista = {};

        const pascoa = this.calcularPascoa(ano);

        const carnavalSeg = new Date(pascoa);
        carnavalSeg.setDate(pascoa.getDate() - 48);

        const carnavalTer = new Date(pascoa);
        carnavalTer.setDate(pascoa.getDate() - 47);

        const quartaCinzas = new Date(pascoa);
        quartaCinzas.setDate(pascoa.getDate() - 46);

        const sextaSanta = new Date(pascoa);
        sextaSanta.setDate(pascoa.getDate() - 2);

        const corpusChristi = new Date(pascoa);
        corpusChristi.setDate(pascoa.getDate() + 60);

        // Nacionais
        lista[`${ano}-01-01`] = "Ano Novo";
        lista[`${ano}-04-21`] = "Tiradentes";
        lista[`${ano}-05-01`] = "Dia do Trabalho";
        lista[`${ano}-09-07`] = "Independência do Brasil";
        lista[`${ano}-10-12`] = "Nossa Senhora Aparecida";
        lista[`${ano}-11-02`] = "Finados";
        lista[`${ano}-11-15`] = "Proclamação da República";
        lista[`${ano}-11-20`] = "Consciência Negra";
        lista[`${ano}-12-25`] = "Natal";

        // Móveis
        lista[this.formatar(carnavalSeg)] = "Carnaval";
        lista[this.formatar(carnavalTer)] = "Carnaval";
        lista[this.formatar(quartaCinzas)] = "Ponto Facultativo - Quarta-feira de Cinzas";
        lista[this.formatar(sextaSanta)] = "Sexta-feira Santa";
        lista[this.formatar(corpusChristi)] = "Corpus Christi";

        // Pernambuco
        lista[`${ano}-03-06`] = "Revolução Pernambucana";

        // Recife
        lista[`${ano}-06-24`] = "São João";
        lista[`${ano}-07-16`] = "Nossa Senhora do Carmo";

        return lista;
    }
};

const App = {
    meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],

    init() {
        const agora = new Date();
        const selMes = document.getElementById("mes");
        const selAno = document.getElementById("ano");

        // Preenche os nomes dos meses no select
        selMes.innerHTML = this.meses.map((m, i) => `<option value="${i}">${m}</option>`).join("");

        // Define automaticamente mês e ano atuais
        selMes.value = agora.getMonth();
        selAno.value = agora.getFullYear();

        // Ouvintes de eventos
        selMes.addEventListener("change", () => this.gerarMes());
        selAno.addEventListener("change", () => this.gerarMes());

        this.gerarMes();

        // Lógica para troca automática caso a página fique aberta na virada do mês
        setInterval(() => {
            const checkData = new Date();
            if (checkData.getMonth() !== parseInt(selMes.value)) {
                selMes.value = checkData.getMonth();
                selAno.value = checkData.getFullYear();
                this.gerarMes();
            }
        }, 60000); 
    },

    classe(n) { 
        return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); 
    },

    gerarMes() {
        const tbody = document.getElementById("tbodyProgramacao");
        if (!tbody) return;

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
            if (semana === 0 || semana === 6) continue; // Pula finais de semana

            const iso = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const tr = document.createElement("tr");

            if (feriadosDatas.includes(iso)) {
                fers++;
                tr.className = "feriado";
                tr.innerHTML = `<td>${data.toLocaleDateString('pt-BR')}</td><td colspan="8">FERIADO: ${feriadosMap[iso]}</td>`;
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
                    <td class="${this.classe(r.spot)}">${r.spot}</td>
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

    exportarExcel() { 
        XLSX.writeFile(XLSX.utils.table_to_book(document.getElementById("tabelaProgramacao")), "Escala_CAF.xlsx"); 
    },

    exportarPDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('l');
        pdf.text("Escala CAF", 14, 10);
        pdf.autoTable({ html: '#tabelaProgramacao', startY: 15, styles: { fontSize: 8 } });
        pdf.save("Escala_CAF.pdf");
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());
