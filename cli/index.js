const inquirer = require('inquirer')
const chalk = require('chalk')
const Project = require('./plugin/project')
const Category = require('./plugin/category')
const TimeRecord = require('./plugin/timeRecord')
const {
    getTime, toTimeString, numberToTime,
    isValidDate, toNCharacter,
} = require('./plugin/utils')
const log = console.log
const debug = false


const printLastRecord = async (count) => {
    const records = await TimeRecord.Read()

    log('Last '+count+' Record')
    log('--------------------------------------------------------------------------------------')
    log(' | '+
        chalk.blue(toNCharacter('Date', 16))         +' | '+
        chalk.magenta(toNCharacter('Start', 5))      +' | '+
        chalk.red(toNCharacter('Finish', 6))         +' | '+
        chalk.cyan(toNCharacter('Project', 12))      +' | '+
        chalk.green(toNCharacter('Category', 12))    +' | '+
        chalk.yellow(toNCharacter('Description', 15))+' | '
    )
    log('--------------------------------------------------------------------------------------')

    const lastRecords = records.slice(0, count)
    lastRecords.forEach(r => {
        const project = r.project ? r.project.title : 'None'
        const category = r.category ? r.category.title : 'None'
        const date = new Date(r.timeStart).toDateString()
        const timeStart = toTimeString(r.timeStart)
        const timeFinish = r.timeFinish ? toTimeString(r.timeFinish) : 'Now'
        const description = r.description
        
        log(' | '+
            chalk.blue(toNCharacter(date, 16))          +' | '+
            chalk.magenta(toNCharacter(timeStart, 5))   +' | '+
            chalk.red(toNCharacter(timeFinish, 6))      +' | '+
            chalk.cyan(toNCharacter(project, 12))       +' | '+
            chalk.green(toNCharacter(category, 12))     +' | '+
            chalk.yellow(toNCharacter(description, 15)) +' | '
        )
    })
    log('--------------------------------------------------------------------------------------')

}


async function main(){
    
    const projects = await Project.Read()
    const categories = await Category.Read()

    const projectChoices = ['None']
    projects.forEach(p => projectChoices.push(p.title))
    
    const categoryChoices = ['None']
    categories.forEach(p => categoryChoices.push(p.title))

    await printLastRecord(5)

    inquirer.prompt([
        {
            name: "project",
            type: "list",
            message: "Choose Project:",
            choices: projectChoices,
        },
        {
            name: "category",
            type: "list",
            message: "Choose Category:",
            choices: categoryChoices,
        },
        {
            name: "description",
            type: "input",
            message: "Description",
        },
        {
            name: "startTime",
            type: "input",
            message: "Time Start e.g '456' of leave blank to now",
        },
        {
            name: "confirm",
            type: "confirm",
            message: "Date will be today and time start is now, Is this OK?",
            default: 'y'
        },
    ]).then(async (answer) => {

        var projectId = undefined
        var categoryId = undefined
        var timeStart = new Date()
        var time = numberToTime(answer.startTime) || getTime()
        timeStart.setSeconds(0)

        for (let project of projects){
            if (project.title == answer.project){
                projectId = project._id
                break
            }
        }
        for (category of categories){
            if (category.title == answer.category){
                categoryId = category._id
                break
            }
        }
        if (!time)
            log(chalk.red('[E] invalid time start'))
        if (!isValidDate(timeStart))
            log(chalk.red('[E] invalid date'))
        if (!projectId && !categoryId)
            log(chalk.red('[E] not select either project or category'))

        if (time){
            timeStart.setHours(time.hours, time.minutes)
        }
        const data = {
            project: projectId,
            category: categoryId,
            description: answer.description,
            timeStart: timeStart.getTime()
        }

        if (time && isValidDate(timeStart) && (projectId || categoryId)){
            await TimeRecord.Insert(data).then(r => {
                log(chalk.green('[S] Create Record Success'))
                if (debug)
                    log('[D]', r)
            }).catch(e => {
                log(chalk.red('[E] Error Create Record'))
            })
        }

        if (debug)
            log('[D]',{
                answer, data, time, 
                timeStart: timeStart.toLocaleString()
            });

    });

}

main()