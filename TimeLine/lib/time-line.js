class TimeLine {
    constructor(props) {

        this.selector = props[0];

        this.dataGetterMethod = props[0];

        this.currentPage = 1;

        this.baseFontSize = 18;

        this.drawnYears = {};

        this.yearLeftErrorMargin = .75;

        this.monthLeftErrorMargin = 1;

        if (typeof props[1] == 'function') {
            this.getData = props[1];
        } else if (typeof props[1] == 'string') {
            this.getData = async() => { await this.getDataFromApi(props[1]); };
        }

        if (this.selector) {
            try {
                this.grid = document.querySelector(this.selector);
            } catch (ex) {
                console.error(`Invalid selector '${this.selector}'`);
            }

            if (this.grid) {
                this.grid.style.maxWidth = '100%';
                this.grid.style.overflowX = 'auto';

                this.drawContainer();

                this.getData(this.currentPage).then((page => {
                    this.pageWidth = this.grid.clientWidth * 1.1 / this.baseFontSize;
                    let minDate = page.projects[0].date;
                    let maxDate = page.projects[page.projects.length - 1].date;
                    let dateDifference = this.differencebetweenDatesInDays(this.stringToDate(minDate), this.stringToDate(maxDate));
                    this.yearWidth = this.pageWidth / (365 / dateDifference);
                    this.drawPage(page);
                }));
            }
        }
    }

    months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''];

    drawContainer = () => {
        const container = document.createElement("div");
        container.style.height = '100%';
        container.style.minWidth = '200%';
        container.style.fontSize = `${this.baseFontSize}px`;
        container.style.position = 'relative';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.justifyContent = 'flex-end';
        container.classList.add('time-line-container');
        while (this.grid.firstChild) {
            this.grid.firstChild.remove();
        }

        const years = document.createElement("div");
        years.style.height = '40%';
        years.style.display = 'flex';
        years.classList.add('years-grid');

        container.appendChild(years);

        this.years = years;
        this.grid.appendChild(container)
    }

    getDataFromApi = async apiUrl => {
        let responce = await fetch(apiUrl);
        return await responce.json();
    }

    drawPage = data => {
        for (const project of data.projects) {
            const year = project.date.substr(0, 4);
            if (!this.drawnYears[year]) {
                this.drawYear(year);
            }
            let yearFirstDay = `${year}0101`;
            this.drawnYears[year].line.appendChild(this.createProjectDot(yearFirstDay, project))
        }

        for (const tech of data.techs) {
            const year = tech.date.substr(0, 4);
            if (!this.drawnYears[year]) {
                this.drawYear(year);
            }
            let yearFirstDay = `${year}0101`;
            this.drawnYears[year].techsDiv.appendChild(this.createTechDiv(yearFirstDay, tech));
        }
    }

    drawYear = year => {

        this.drawnYears[year] = {
            year: Number(year),
            line: null,
            techsDiv: null
        };

        const yearBlock = document.createElement("div");
        yearBlock.style.width = `${this.yearWidth}em`;
        yearBlock.style.backgroundColor = '#0f0';
        yearBlock.style.display = 'flex';
        yearBlock.style.flexDirection = 'column';
        yearBlock.style.justifyContent = 'space-between';

        yearBlock.classList.add('year-block');

        this.years.appendChild(yearBlock);

        yearBlock.appendChild(this.createBottomDiv(year));

        // if (!this.leftErrorMargin) {
        //     this.leftErrorMargin = this.leftErrorMarginDiv.offsetLeft / this.baseFontSize - .75;
        // }

        yearBlock.prepend(this.createTopLine(year, this.drawnYears[year]));

    }

    createTopLine = (year, yearObject) => {
        const container = document.createElement("div");
        container.style.backgroundColor = '#0ff';
        container.style.flex = '0 0 60%';
        container.classList.add('line-container');


        const line = document.createElement("div");
        line.style.backgroundColor = '#ff0';
        line.style.position = 'relative';
        line.style.height = '2em';
        line.classList.add('timeLine-line');

        line.appendChild(this.createLine());

        line.appendChild(this.createYearDot(year));

        yearObject.line = line;

        const techs = document.createElement("div");
        techs.style.backgroundColor = '#f0f';
        techs.style.position = 'relative';
        techs.style.height = '100%';
        techs.classList.add('techs-grid');

        yearObject.techsDiv = techs;

        container.appendChild(line)
        container.appendChild(techs)

        return container;
    }

    createLine = () => {
        const line = document.createElement("div");
        line.style.backgroundColor = "#DCDCDC";
        line.style.height = "2px";
        line.style.borderRadius = "1px";
        line.style.position = 'relative';
        line.style.top = 'calc(1em - 1px)';
        return line;
    }

    createYearDot = year => {
        const dot = document.createElement("div");
        dot.style.width = '2em';
        dot.style.height = '2em';
        dot.style.backgroundColor = '#707070';
        dot.style.borderRadius = '50%';
        dot.style.position = 'absolute';
        dot.style.left = `${this.round(this.yearLeftErrorMargin, 2)}em`;
        dot.style.top = '0';
        dot.style.zIndex = '1';
        dot.classList.add('year-dot');
        dot.title = year;
        return dot;
    }

    createProjectDot = (year, project) => {
        let dateDifference = this.differencebetweenDatesInDays(this.stringToDate(year), this.stringToDate(project.date))

        if (dateDifference > 365) {
            return null;
        }

        const dot = document.createElement("div");
        dot.style.width = '1em';
        dot.style.height = '1em';
        dot.style.backgroundColor = '#707070';
        dot.style.borderRadius = '50%';
        dot.style.position = 'absolute';
        dot.style.left = `${this.round((dateDifference * this.yearWidth) / 365 + this.monthLeftErrorMargin, 2)}em`;
        dot.style.top = '.5em';
        dot.style.zIndex = '1';
        dot.title = `${project.name}\n${this.date8CharToString(project.date)}\n${project.mainTech}`;
        dot.dataset.name = project.name;

        dot.classList.add('project-dot');
        return dot;
    }

    createTechDiv = (year, tech) => {
        let dateDifference = this.differencebetweenDatesInDays(this.stringToDate(year), this.stringToDate(tech.date))

        if (dateDifference > 365) {
            return null;
        }

        const container = document.createElement("div");
        container.style.height = '100%';
        container.style.position = 'absolute';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';

        const line = document.createElement("div");
        line.style.borderLeft = "dashed 2px #DCDCDC";
        line.style.flex = "1 1 100%";
        line.style.marginBottom = "1em";

        const text = document.createElement("div");
        text.style.color = '#707070';
        text.style.fontSize = '1em';
        text.innerText = tech.name;

        container.style.left = `${this.round((dateDifference * this.yearWidth) / 365 + this.monthLeftErrorMargin - (container.offsetWidth / (2 * this.baseFontSize)), 2)}em`;

        container.appendChild(line);
        container.appendChild(text);

        return container;
    }

    createBottomDiv = year => {
        const container = document.createElement("div");
        container.style.height = '100%';
        container.style.backgroundColor = '#f00';
        container.style.flex = '0 0 2em';
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        container.style.justifyContent = 'space-between';
        container.style.alignItems = 'center';
        container.classList.add('year-grid');

        let yearText = this.createYearText(year);
        container.appendChild(yearText);

        // this.leftErrorMarginDiv = yearText;

        for (const month of this.months) {
            container.appendChild(this.createMonthDiv(month));
        }

        return container;
    }

    createYearText = year => {
        const div = document.createElement("div");
        div.style.fontSize = '1.5em';
        div.style.fontWeight = '500';
        div.style.color = '#707070';
        div.classList.add('year-text');
        div.innerText = year;
        return div;
    }

    createMonthDiv = month => {
        const div = document.createElement("div");
        div.style.fontSize = '1em';
        div.style.fontWeight = '300';
        div.style.color = '#707070';
        div.classList.add('month-text');
        div.innerText = month;
        return div;
    }

    nextPage = () => {
        this.currentPage++;
        this.getData(this.currentPage).then((page => {
            this.drawPage(page);
        }));
    }

    date8CharToString = date => {
        return `${date.substr(0,4)}-${date.substr(4,2)}-${date.substr(6,2)}`
    }

    stringToDate = str => {
        return Date.parse(`${str.substr(0,4)}-${str.substr(4,2)}-${str.substr(6,2)}T00:00:00.000Z`)
    }

    differencebetweenDatesInDays = (date1, date2) => {
        return Math.abs((date2 - date1) / 86400000)
    }

    round(number, digits) {
        let multiplier = Math.pow(10, digits);
        return Math.round(number * multiplier) / multiplier;
    }

}