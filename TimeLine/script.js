var timeLine;

var settings = {
    pointPerPage: 5,
    maxProjectsCountPerYear: 12,
};

function initialTimeLine() {
    if (!timeLine) {
        timeLine = new TimeLine(['#draw-canvas', getPage])
    }
}

function drawNextPage() {
    timeLine.nextPage();
}


async function getPage(pageNumber) {
    if (!pageNumber) {
        return;
    }

    if (!data) {
        await readDataFile();
    }

    let startDate,
        startDateIndex = (pageNumber - 1) * settings.pointPerPage - 1;

    if (startDateIndex < 0) {
        startDateIndex = 0;
    }

    if (data.projects && data.projects.length) {
        if (startDateIndex < data.projects.length) {
            startDate = data.projects[startDateIndex].date;
        }

    } else if (data.techs && data.techs.length) {
        if (startDateIndex < data.techs.length) {
            startDate = data.techs[startDateIndex].date;
        }
    }

    if (!startDate) {
        startDate = '9'
    }

    let projects = [],
        techs = [];
    if (data.projects && data.projects.length) {
        if (startDateIndex) {
            startDateIndex++;
        }
        projects = data.projects.slice(startDateIndex, startDateIndex + settings.pointPerPage)
        let endDate = startDate;
        if (projects.length) {
            endDate = projects[projects.length - 1].date;
        }
        techs = data.techs.filter(val => val.date >= startDate && val.date < endDate)
    }

    return { projects, techs };
}

var data;
async function readDataFile() {

    try {
        let response = await fetch('./data.json');
        if (response && response.status == 200) {
            data = await response.json();

            data.projects.sort((a, b) => a.date.localeCompare(b.date));
            data.techs.sort((a, b) => a.date.localeCompare(b.date));
        }
    } catch (error) {
        console.error(error);
    }

}
window.addEventListener('load', initialTimeLine);