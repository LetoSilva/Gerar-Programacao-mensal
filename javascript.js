/* ==========================================================
   CAF • PROGRAMAÇÃO INTELIGENTE
   VERSÃO 2.1
   JAVASCRIPT ORGANIZADO
========================================================== */


/* ==========================================================
   01. FERIADOS
========================================================== */

const Holidays = {

    formatar(data) {

        return data
            .toISOString()
            .split("T")[0];
    },


    calcularPascoa(ano) {

        const a = ano % 19;
        const b = Math.floor(ano / 100);
        const c = ano % 100;

        const d = Math.floor(b / 4);
        const e = b % 4;

        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);

        const h =
            (19 * a + b - d - g + 15) % 30;

        const i = Math.floor(c / 4);
        const k = c % 4;

        const l =
            (32 + 2 * e + 2 * i - h - k) % 7;

        const m =
            Math.floor(
                (a + 11 * h + 22 * l) / 451
            );

        return new Date(
            ano,
            Math.floor(
                (h + l - 7 * m + 114) / 31
            ) - 1,
            ((h + l - 7 * m + 114) % 31) + 1
        );
    },


    obter(ano) {

        const lista = {};

        const pascoa =
            this.calcularPascoa(ano);


        /* Feriados móveis */

        const carnavalSeg = new Date(pascoa);
        carnavalSeg.setDate(
            pascoa.getDate() - 48
        );


        const carnavalTer = new Date(pascoa);
        carnavalTer.setDate(
            pascoa.getDate() - 47
        );


        const quartaCinzas = new Date(pascoa);
        quartaCinzas.setDate(
            pascoa.getDate() - 46
        );


        const sextaSanta = new Date(pascoa);
        sextaSanta.setDate(
            pascoa.getDate() - 2
        );


        const corpusChristi = new Date(pascoa);
        corpusChristi.setDate(
            pascoa.getDate() + 60
        );


        /* Feriados nacionais */

        lista[`${ano}-01-01`] =
            "Ano Novo";

        lista[`${ano}-04-21`] =
            "Tiradentes";

        lista[`${ano}-05-01`] =
            "Dia do Trabalho";

        lista[`${ano}-09-07`] =
            "Independência do Brasil";

        lista[`${ano}-10-12`] =
            "Nossa Senhora Aparecida";

        lista[`${ano}-11-02`] =
            "Finados";

        lista[`${ano}-11-15`] =
            "Proclamação da República";

        lista[`${ano}-11-20`] =
            "Consciência Negra";

        lista[`${ano}-12-25`] =
            "Natal";


        /* Feriados móveis */

        lista[this.formatar(carnavalSeg)] =
            "Carnaval";

        lista[this.formatar(carnavalTer)] =
            "Carnaval";

        lista[this.formatar(quartaCinzas)] =
            "Ponto Facultativo - Quarta-feira de Cinzas";

        lista[this.formatar(sextaSanta)] =
            "Sexta-feira Santa";

        lista[this.formatar(corpusChristi)] =
            "Corpus Christi";


        /* Pernambuco */

        lista[`${ano}-03-06`] =
            "Revolução Pernambucana";


        /* Recife */

        lista[`${ano}-06-24`] =
            "São João";

        lista[`${ano}-07-16`] =
            "Nossa Senhora do Carmo";


        return lista;
    }
};


/* ==========================================================
   02. ESCALA / RODÍZIO
========================================================== */

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


    dataBase:
        new Date(2026, 4, 4),


    obterIndiceParaData(dataAlvo, ano) {

        let contador = 0;

        const data =
            new Date(this.dataBase);

        const feriados =
            Holidays.obter(ano);

        const feriadosDatas =
            Object.keys(feriados);


        while (data < dataAlvo) {

            const diaSemana =
                data.getDay();

            const iso =
                `${data.getFullYear()}-${String(
                    data.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    data.getDate()
                ).padStart(2, "0")}`;


            const diaUtil =
                diaSemana !== 0 &&
                diaSemana !== 6 &&
                !feriadosDatas.includes(iso);


            if (diaUtil) {
                contador++;
            }


            data.setDate(
                data.getDate() + 1
            );
        }


        return contador;
    }
};


/* ==========================================================
   03. APLICAÇÃO
========================================================== */

const App = {

    meses: [

        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"

    ],


    /* ======================================================
       TEMAS MENSAIS
    ====================================================== */

    temasMensais: [

        {
            nome: "Janeiro",
            principal: "#64748B",
            secundario: "#64748B",
            bg: "#F8FAFC",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#F1F5F9",
            text: "#1E293B",
            border: "#E2E8F0",
            accent: "#64748B"
        },

        {
            nome: "Fevereiro",
            principal: "#7C3AED",
            secundario: "#7C3AED",
            bg: "#FAF5FF",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#F3E8FF",
            text: "#2E1065",
            border: "#E9D5FF",
            accent: "#7C3AED"
        },

        {
            nome: "Março",
            principal: "#2563EB",
            secundario: "#2563EB",
            bg: "#EFF6FF",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#DBEAFE",
            text: "#172554",
            border: "#BFDBFE",
            accent: "#2563EB"
        },

        {
            nome: "Abril - Autismo",
            principal: "#2563EB",
            secundario: "#FACC15",
            bg: "#F8FAFC",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#EFF6FF",
            text: "#1E293B",
            border: "#BFDBFE",
            accent: "#2563EB"
        },

        {
            nome: "Maio - Hepatite",
            principal: "#FACC15",
            secundario: "#DC2626",
            bg: "#FFFBEB",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#FEF2F2",
            text: "#451A03",
            border: "#FDE68A",
            accent: "#DC2626"
        },

        {
            nome: "Junho",
            principal: "#DC2626",
            secundario: "#DC2626",
            bg: "#FEF2F2",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#FEE2E2",
            text: "#450A0A",
            border: "#FECACA",
            accent: "#DC2626"
        },

        {
            nome: "Julho",
            principal: "#EA580C",
            secundario: "#EA580C",
            bg: "#FFF7ED",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#FFEDD5",
            text: "#431407",
            border: "#FED7AA",
            accent: "#EA580C"
        },

        {
            nome: "Agosto",
            principal: "#D97706",
            secundario: "#D97706",
            bg: "#FFFBEB",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#FEF3C7",
            text: "#451A03",
            border: "#FDE68A",
            accent: "#D97706"
        },

        {
            nome: "Setembro",
            principal: "#059669",
            secundario: "#059669",
            bg: "#ECFDF5",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#D1FAE5",
            text: "#064E3B",
            border: "#A7F3D0",
            accent: "#059669"
        },

        {
            nome: "Outubro",
            principal: "#DB2777",
            secundario: "#DB2777",
            bg: "#FDF2F8",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#FCE7F3",
            text: "#500724",
            border: "#FBCFE8",
            accent: "#DB2777"
        },

        {
            nome: "Novembro",
            principal: "#0284C7",
            secundario: "#0284C7",
            bg: "#F0F9FF",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#E0F2FE",
            text: "#082F49",
            border: "#BAE6FD",
            accent: "#0284C7"
        },

        {
            nome: "Dezembro",
            principal: "#B91C1C",
            secundario: "#B91C1C",
            bg: "#FEF2F2",
            card: "#FFFFFF",
            table: "#FFFFFF",
            hover: "#FEE2E2",
            text: "#450A0A",
            border: "#FECACA",
            accent: "#B91C1C"
        }

    ],


    /* ======================================================
       04. INICIALIZAÇÃO
    ====================================================== */

    init() {

        const agora =
            new Date();

        const selectMes =
            document.getElementById("mes");

        const selectAno =
            document.getElementById("ano");


        if (!selectMes || !selectAno) {

            console.error(
                "Elementos de mês ou ano não encontrados."
            );

            return;
        }


        this.preencherMeses(selectMes);

        this.definirAnoAtual(selectAno);

        selectMes.value =
            agora.getMonth();


        selectMes.addEventListener(
            "change",
            () => this.gerarMes()
        );


        selectAno.addEventListener(
            "change",
            () => this.gerarMes()
        );


        document
            .getElementById("btnTema")
            ?.addEventListener(
                "click",
                () => this.alternarTema()
            );


        document
            .getElementById("btnExcel")
            ?.addEventListener(
                "click",
                () => this.exportarExcel()
            );


        document
            .getElementById("btnPDF")
            ?.addEventListener(
                "click",
                () => this.exportarPDF()
            );


        this.atualizarAnoRodape();

        this.gerarMes();

        this.monitorarMes();
    },


    /* ======================================================
       05. PREENCHER MESES
    ====================================================== */

    preencherMeses(select) {

        select.innerHTML =
            this.meses
                .map(
                    (mes, indice) =>
                        `<option value="${indice}">
                            ${mes}
                        </option>`
                )
                .join("");
    },


    /* ======================================================
       06. DEFINIR ANO
    ====================================================== */

    definirAnoAtual(select) {

        const anoAtual =
            new Date().getFullYear();

        const existe =
            [...select.options]
                .some(
                    option =>
                        Number(option.value) === anoAtual
                );


        if (existe) {
            select.value = anoAtual;
        }
    },


    /* ======================================================
       07. CLASSE DO RESPONSÁVEL
    ====================================================== */

    classe(nome) {

        return nome
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase();
    },


    /* ======================================================
       08. APLICAR TEMA
    ====================================================== */

    aplicarTemaMensal(mes) {

        const tema =
            this.temasMensais[mes];

        if (!tema) return;


        const root =
            document.documentElement;


        root.style.setProperty(
            "--bg",
            tema.bg
        );

        root.style.setProperty(
            "--card",
            tema.card
        );

        root.style.setProperty(
            "--table",
            tema.table
        );

        root.style.setProperty(
            "--text",
            tema.text
        );

        root.style.setProperty(
            "--border",
            tema.border
        );

        root.style.setProperty(
            "--primary",
            tema.principal
        );

        root.style.setProperty(
            "--secondary",
            tema.secundario
        );

        root.style.setProperty(
            "--muted",
            tema.principal
        );

        root.style.setProperty(
            "--hover",
            tema.hover
        );

        root.style.setProperty(
            "--accent",
            tema.accent
        );


        /* Abril */

        if (mes === 3) {

            root.style.setProperty(
                "--gradient",
                "linear-gradient(135deg, #2563EB, #FACC15)"
            );

        }


        /* Maio */

        else if (mes === 4) {

            root.style.setProperty(
                "--gradient",
                "linear-gradient(135deg, #FACC15, #DC2626)"
            );

        }


        /* Demais meses */

        else {

            root.style.setProperty(
                "--gradient",
                tema.principal
            );
        }


        document.body.dataset.mes =
            mes;


        document.title =
            `CAF • ${this.meses[mes]} | Programação Inteligente`;
    },


    /* ======================================================
       09. GERAR MÊS
    ====================================================== */

    gerarMes() {

        const tbody =
            document.getElementById(
                "tbodyProgramacao"
            );


        if (!tbody) return;


        tbody.innerHTML = "";


        const mes =
            Number(
                document.getElementById("mes").value
            );


        const ano =
            Number(
                document.getElementById("ano").value
            );


        this.aplicarTemaMensal(mes);


        const feriados =
            Holidays.obter(ano);


        const feriadosDatas =
            Object.keys(feriados);


        const ultimoDia =
            new Date(
                ano,
                mes + 1,
                0
            ).getDate();


        let diasUteis = 0;
        let totalFeriados = 0;


        const hoje =
            new Date();


        let emailHoje = "-";


        /* ==================================================
           PERCORRE OS DIAS
        ================================================== */

        for (
            let dia = 1;
            dia <= ultimoDia;
            dia++
        ) {

            const data =
                new Date(
                    ano,
                    mes,
                    dia
                );


            const diaSemana =
                data.getDay();


            /* Ignora sábado e domingo */

            if (
                diaSemana === 0 ||
                diaSemana === 6
            ) {
                continue;
            }


            const iso =
                `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;


            const tr =
                document.createElement("tr");


            /* =================================================
               DIA ATUAL
            ================================================= */

            const ehHoje =
                data.getDate() === hoje.getDate() &&
                data.getMonth() === hoje.getMonth() &&
                data.getFullYear() === hoje.getFullYear();


            if (ehHoje) {
                tr.classList.add("hoje");
            }


            /* =================================================
               FERIADO
            ================================================= */

            if (
                feriadosDatas.includes(iso)
            ) {

                totalFeriados++;

                tr.classList.add("feriado");


                tr.innerHTML = `

                    <td>
                        ${data.toLocaleDateString("pt-BR")}
                    </td>

                    <td colspan="8">
                        FERIADO:
                        ${feriados[iso]}
                    </td>

                `;

            }


            /* =================================================
               DIA NORMAL
            ================================================= */

            else {

                const indice =
                    Scheduler.obterIndiceParaData(
                        data,
                        ano
                    );


                const responsavel =
                    Scheduler.rodizio[
                        indice % Scheduler.rodizio.length
                    ];


                tr.innerHTML = `

                    <td>
                        ${data.toLocaleDateString("pt-BR")}
                    </td>

                    <td class="${this.classe(responsavel.email)}">
                        ${responsavel.email}
                    </td>

                    <td class="${this.classe(responsavel.retorno)}">
                        ${responsavel.retorno}
                    </td>

                    <td class="${this.classe(responsavel.fieldglass)}">
                        ${responsavel.fieldglass}
                    </td>

                    <td class="${this.classe(responsavel.fup)}">
                        ${responsavel.fup}
                    </td>

                    <td class="${this.classe(responsavel.service)}">
                        ${responsavel.service}
                    </td>

                    <td class="${this.classe(responsavel.v360)}">
                        ${responsavel.v360}
                    </td>

                    <td class="${this.classe(responsavel.spot)}">
                        ${responsavel.spot}
                    </td>

                    <td class="${this.classe(responsavel.encerramento)}">
                        ${responsavel.encerramento}
                    </td>

                `;


                diasUteis++;


                if (ehHoje) {
                    emailHoje =
                        responsavel.email;
                }
            }


            tbody.appendChild(tr);
        }


        this.atualizarIndicadores(
            diasUteis,
            totalFeriados,
            emailHoje
        );


        this.atualizarSubtitulo(
            mes,
            ano
        );
    },


    /* ======================================================
       10. ATUALIZAR INDICADORES
    ====================================================== */

    atualizarIndicadores(
        diasUteis,
        feriados,
        emailHoje
    ) {

        const diasElemento =
            document.getElementById("diasMes");


        const feriadosElemento =
            document.getElementById("feriadosMes");


        const labelFeriado =
            document.getElementById("labelFeriado");


        const emailElemento =
            document.getElementById("ultimoEmail");


        if (diasElemento) {
            diasElemento.textContent =
                diasUteis;
        }


        if (feriadosElemento) {
            feriadosElemento.textContent =
                feriados;
        }


        if (labelFeriado) {

            labelFeriado.textContent =
                feriados === 1
                    ? "FERIADO"
                    : "FERIADOS";
        }


        if (emailElemento) {

            emailElemento.textContent =
                emailHoje;
        }
    },


    /* ======================================================
       11. SUBTÍTULO
    ====================================================== */

    atualizarSubtitulo(mes, ano) {

        const elemento =
            document.getElementById(
                "tableSubtitle"
            );


        if (!elemento) return;


        elemento.textContent =
            `${this.meses[mes]} de ${ano} • Programação operacional`;
    },


    /* ======================================================
       12. TEMA ESCURO
    ====================================================== */

    alternarTema() {

        document.body.classList.toggle(
            "dark"
        );


        const botao =
            document.getElementById(
                "btnTema"
            );


        if (!botao) return;


        const modoEscuro =
            document.body.classList.contains(
                "dark"
            );


        botao.textContent =
            modoEscuro
                ? "☀️ Tema Claro"
                : "🌙 Tema Escuro";
    },


    /* ======================================================
       13. EXPORTAR EXCEL
    ====================================================== */

    exportarExcel() {

        if (
            typeof XLSX === "undefined"
        ) {

            alert(
                "Biblioteca Excel não encontrada."
            );

            return;
        }


        const tabela =
            document.getElementById(
                "tabelaProgramacao"
            );


        const workbook =
            XLSX.utils.table_to_book(
                tabela
            );


        const mes =
            Number(
                document.getElementById(
                    "mes"
                ).value
            );


        const ano =
            document.getElementById(
                "ano"
            ).value;


        XLSX.writeFile(
            workbook,
            `Escala_CAF_${this.meses[mes]}_${ano}.xlsx`
        );
    },


    /* ======================================================
       14. EXPORTAR PDF
    ====================================================== */

    exportarPDF() {

        if (
            typeof window.jspdf === "undefined"
        ) {

            alert(
                "Biblioteca PDF não encontrada."
            );

            return;
        }


        const {
            jsPDF
        } = window.jspdf;


        const pdf =
            new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            });


        const mes =
            Number(
                document.getElementById(
                    "mes"
                ).value
            );


        const ano =
            document.getElementById(
                "ano"
            ).value;


        pdf.setFontSize(14);

        pdf.text(
            `Escala CAF - ${this.meses[mes]} ${ano}`,
            14,
            10
        );


        pdf.autoTable({

            html:
                "#tabelaProgramacao",

            startY:
                15,

            theme:
                "grid",

            styles: {

                fontSize:
                    7,

                cellPadding:
                    1.5,

                halign:
                    "center",

                valign:
                    "middle"
            },

            headStyles: {

                fillColor:
                    [37, 99, 235],

                textColor:
                    [255, 255, 255],

                fontStyle:
                    "bold"
            }
        });


        pdf.save(
            `Escala_CAF_${this.meses[mes]}_${ano}.pdf`
        );
    },


    /* ======================================================
       15. ANO DO RODAPÉ
    ====================================================== */

    atualizarAnoRodape() {

        const elemento =
            document.getElementById(
                "systemYear"
            );


        if (elemento) {

            elemento.textContent =
                new Date().getFullYear();
        }
    },


    /* ======================================================
       16. MONITORAMENTO AUTOMÁTICO
    ====================================================== */

    monitorarMes() {

        setInterval(() => {

            const agora =
                new Date();


            const mesSelecionado =
                Number(
                    document.getElementById(
                        "mes"
                    )?.value
                );


            const anoSelecionado =
                Number(
                    document.getElementById(
                        "ano"
                    )?.value
                );


            if (
                agora.getMonth() !== mesSelecionado &&
                agora.getFullYear() === anoSelecionado
            ) {

                const selectMes =
                    document.getElementById(
                        "mes"
                    );


                if (selectMes) {

                    selectMes.value =
                        agora.getMonth();

                    this.gerarMes();
                }
            }


            /*
             * Regenera a programação quando
             * muda o dia, garantindo que
             * "E-MAIL DE HOJE" seja atualizado.
             */

            if (
                agora.getHours() === 0 &&
                agora.getMinutes() === 0
            ) {

                this.gerarMes();
            }

        }, 60000);
    }
};


/* ==========================================================
   17. INICIALIZAÇÃO DO SISTEMA
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.init();

    }
);
