<template>
    <div>
        <div style="border: 1px solid black; margin: 1rem; padding: 1rem">
            <h3 style="margin: 0">Current Record</h3>
            <i>{{ createForm.id ? `Editing ${createForm.id}` : 'Create New Record' }}</i>
            <hr>
            
            <div>
                <label for="project">Project</label><br>
                <select id="project" v-model="createForm.project">
                    <option :value="undefined">None</option>
                    <option :value="project._id" v-for="(project, i) in projects" :key=i>{{project.title}}</option>
                </select>
                <router-link to="/proect" tag="button">New</router-link>
            </div>
            
            <div>
                <label for="category">Category</label><br>
                <select id="category" v-model="createForm.category">
                    <option :value="undefined">None</option>
                    <option :value="category._id" v-for="(category, i) in categories" :key=i>{{category.title}}</option>
                </select>
                <router-link to="/category" tag="button">New</router-link>
            </div>

            <div>
                <label for="time-start-selector">Time Start</label><br>
                <select id="time-start-selector" v-model="startSelector">
                    <option :value="selector" v-for="(selector, i) in timeSelector" :key=i>{{selector}}</option>
                </select>
                <input type="datetime-local" id="time-start" v-show="startSelector == 'Custom'"
                    :value="createForm.timeStart" @input="updateTimeStartValue($event.target.value)" >
                <br>
                <input type="checkbox" id="done" v-model="isDone">
                <label for="done">Done</label>
            </div>
            
            <div v-show="isDone">
                <label for="time-finish-selector">Time Finish</label><br>
                <select id="time-finish-selector" v-model="finishSelector">
                    <option :value="selector" v-for="(selector, i) in timeSelector" :key=i>{{selector}}</option>
                </select>
                <input type="datetime-local" id="time-finish" v-show="finishSelector == 'Custom'"
                    :value="createForm.timeFinish" @input="updateTimeFinishValue($event.target.value)" >
            </div>

            <div>
                <label for="description">Description</label><br>
                <textarea id="description" rows="4" v-model="createForm.description"></textarea>
            </div>
            <button v-on:click="submitForm">submit</button>
            <button v-on:click="resetForm">reset</button>
        </div>

        <div style="border: 1px solid black; margin: 1rem; padding: 1rem">

            <h3 style="margin: 0">All Records</h3>
            <hr>
            <ol>
                <li v-for="(record, i) in records" :key="i" style="border: 1px solid black; margin: 1rem; padding: .5rem">
                    <table>
                        <tr>
                            <td>Project</td>
                            <td>: {{record.project ? record.project.title : "-"}}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>: {{record.category ? record.category.title : "-"}}</td>
                        </tr>
                        <tr>
                            <td>Time Start </td>
                            <td>: {{toDate(record.timeStart)}}</td>
                        </tr>
                        <tr>
                            <td>Time Finish</td>
                            <td>: {{toDate(record.timeFinish)}}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>: {{record.description}}</td>
                        </tr>
                        <tr>
                            <td>
                                <button v-on:click="prepareEdit(i)">Edit</button>
                                <button v-on:click="removeRecord(i)">Delete</button>
                            </td>
                        </tr>
                    </table>  
                    
                </li>
            </ol>
        </div>
    </div>
</template>

<script>

import TimeRecord from "@/plugin/timeRecord.js"
import Category from "@/plugin/category.js"
import Project from "@/plugin/project.js"
import Utils from "@/plugin/utils.js"

export default {
    name: "TimeRecord",
    data() {
        return {
            createForm: {
                id: undefined,
                description: "",
                project: undefined,
                category: undefined,
                timeStart: undefined,
                timeFinish: undefined
            },
            startSelector: "Now",
            finishSelector: "Now",
            isDone: false,
            records: [],
            categories: [],
            projects: [],
        }
    },
    methods: {
        toDate: Utils.toDate,
        async loadData() {
            this.records = await TimeRecord.Read()
            this.projects = await Project.Read()
            this.categories = await Category.Read()
        },
        submitForm() {
            const id = this.createForm.id
            const data = {
                project: this.createForm.project,
                category: this.createForm.category,
                description: this.createForm.description,
                timeStart: new Date(this.currentTimeStart).getTime(),
                timeFinish: this.currentTimeFinish ? new Date(this.currentTimeFinish).getTime() : undefined
            }
            if (id){
                TimeRecord.Update(id, data).then(this.loadData).then(this.resetForm)
            } else {
                TimeRecord.Insert(data).then(this.loadData).then(this.resetForm)
            }
        },
        resetForm() {
            this.createForm.id = undefined,
            this.createForm.project = undefined,
            this.createForm.category = undefined,
            this.createForm.timeStart = undefined,
            this.createForm.timeFinish = undefined,
            this.createForm.description = ""
            this.startSelector = "Now"
            this.finishSelector = "Now"
            this.isDone = false
        },
        prepareEdit(index) {
            const { _id, project, category, description, timeStart, timeFinish } = this.records[index]
            this.createForm.id = _id
            this.createForm.description = description
            this.createForm.timeStart = Utils.toDateLocaleString(timeStart)
            this.createForm.timeFinish = timeFinish ? Utils.toDateLocaleString(timeFinish) : undefined
            this.isDone = timeFinish != undefined
            this.startSelector = "Custom"
            this.finishSelector = "Custom"
            this.createForm.project = project ? project._id : undefined
            this.createForm.category = category ? category._id : undefined
        },
        removeRecord(index) {
            const { _id } = this.records[index]
            console.log(_id)
            TimeRecord.Remove( _id ).then(this.loadData)
        },
        updateTimeStartValue(value) {
            this.createForm.timeStart = value
            this.$emit('input', value)
        },
        updateTimeFinishValue(value) {
            this.createForm.timeFinish = value
            this.$emit('input', value)
        },
    },
    computed: {
        timeSelector(){
            return ["Now", "Custom"]
        },
        currentTimeStart(){
            return this.startSelector == "Now" ? 
                    Date.now() 
                    : new Date(this.createForm.timeStart).getTime()
        },
        currentTimeFinish(){
            return this.isDone ? (
                this.finishSelector == "Now" ? 
                    Date.now() 
                    : new Date(this.createForm.timeFinish).getTime()
                ) : undefined
        }
    },
    mounted() {
        this.loadData()
    },
}
</script>

