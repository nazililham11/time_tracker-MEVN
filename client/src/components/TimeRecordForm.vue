<template>
    <div class="card shadow">
        <div class="card-body">
            <h5 class="card-title">Create New Record</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ form.id ? `Editing ${form.id}` : 'Create New Record' }}</h6>
            <hr>

            <div class="row">
                <!-- Project -->
                <div class="col form-group">
                    <div class="d-flex flex-row justify-content-between align-items-end mb-2">
                        <label for="project">Project</label>
                        <router-link to="/project" class="btn btn-sm btn-outline-primary">Create</router-link>
                    </div>

                    <select class="form-control" id="project" v-model="form.project">
                        <option :value="undefined" selected>None</option>
                        <option :value="project._id" v-for="(project, i) in projects" :key=i>{{project.title}}</option>
                    </select>
                </div>
                <!-- Category -->
                <div class="col form-group">
                    <div class="d-flex flex-row justify-content-between align-items-end mb-2">
                        <label for="category">Category</label>
                        <router-link to="/category" class="btn btn-sm btn-outline-primary">Create</router-link>
                    </div>
                    
                    <select class="form-control" id="category" v-model="form.category">
                        <option :value="undefined">None</option>
                        <option :value="category._id" v-for="(category, i) in categories" :key=i>{{category.title}}</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <!-- Custom Date Select  -->
                <div class="col form-group">
                    <label for="custom-date">Date</label>
                    <input type="date" class="form-control" id="custom-date" v-model="form.date">
                </div>
                <!-- Time Start -->
                <div class="col form-group">
                    <label for="time-start">Time Start</label>
                    <input type="number" class="form-control" id="time-start" placeholder="From (Now)"
                        v-model="form.timeStart">
                    <small>Leave blank to Now</small>
                </div>
                
                <!-- Time Finish -->
                <div class="col form-group">
                    <label for="time-finish">Time Finish</label>
                    <input type="number" class="form-control" id="time-finish" placeholder="To (Running)"
                        v-model="form.timeFinish">
                    <small>Leave blank to still Running</small>
                </div>
            </div>

            <div class="row">
                <!-- Description -->
                <div class="col form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="4" 
                        v-model="form.description"></textarea>
                </div>
            </div>

            <div class="d-flex">
                <button class="btn btn-primary mr-3" v-on:click="submitForm">Submit</button>
                <button class="btn btn-info mr-3" v-on:click="resetForm">Reset</button>
                <button class="btn btn-danger mr-3" v-on:click="deleteRecord" v-show="form.id">Delete</button>
                <button class="btn btn-danger mr-3" 
                    v-show="form.id && edited && !edited.timeFinish"
                    v-on:click="stopRecord">Stop</button>
            </div>
        </div>
        
    </div>
</template>

<script>

import TimeRecord from "@/plugin/timeRecord.js"
import Category from "@/plugin/category.js"
import Project from "@/plugin/project.js"
import { toDate, toISODateString, numberToTime, isValidDate, getTime, compareTime, toTimeNumber } from "@/plugin/utils.js"

export default {
    props: {
        edited: Object
    },
    data() {
        return {
            form: {
                id: undefined,
                project: undefined,
                category: undefined,
                date: undefined,
                description: undefined,
                timeStart: undefined,
                timeFinish: undefined
            },
            categories: [],
            projects: [],
        }
    },
    watch: {
        edited(){
            const e = this.edited
            if (e._id){
                this.form.id = e._id
                this.form.project = e.project
                this.form.category = e.category
                this.form.description = e.description
                this.form.timeStart = toTimeNumber(e.timeStart)
                this.form.timeFinish = toTimeNumber(e.timeFinish)
                this.form.date = toISODateString(new Date(e.timeStart)) 
            }
        }
    },
    methods: {
        async loadData() {
            this.projects = await Project.Read()
            this.categories = await Category.Read()
        },
        getFormValues(){
            var date = new Date(this.form.date)
            var timeStart = numberToTime(this.form.timeStart) || getTime()
            var timeFinish = numberToTime(this.form.timeFinish)
            const { project, category, description } = this.form
            
            if (!timeStart)
                console.log('invalid time start')
            if (!isValidDate(date))
                console.log('invalid date')
            if (!project && !category)
                console.log('not select either project or category')

            if (timeStart && isValidDate(date) && (project || category)){
                if (timeFinish){
                    const compare = compareTime(timeStart, timeFinish)
                    timeFinish = new Date(date.setHours(timeFinish.hours, timeFinish.minutes))
                    if (compare == 1){
                        timeFinish.setDate(timeFinish.getDate()+1)
                    }
                    timeFinish = timeFinish.getTime()
                }
                timeStart = new Date(date.setHours(timeStart.hours, timeStart.minutes))
                
                timeStart = timeStart.getTime()

                return { project, category, timeStart, timeFinish, description }

            }
        },
        submitForm() {
            const data = this.getFormValues()     
            const id = this.form.id
            if (data){
                if (id){
                    TimeRecord.Update(id, data).then(this.updateRecord).then(this.resetForm)
                } else {
                    TimeRecord.Insert(data).then(this.updateRecord).then(this.resetForm)
                }
            }
        },
        resetForm() {
            this.form.id = undefined
            this.form.project = undefined
            this.form.category = undefined
            this.form.date = toISODateString(new Date())
            this.form.timeStart = undefined
            this.form.timeFinish = undefined
            this.form.description = undefined
            this.$emit('reset_form')
        },
        deleteRecord(){
            if (this.form.id){
                var retVal = confirm("Are you sure want delete this record?")
                if (retVal == true)
                    TimeRecord.Remove(this.form.id).then(this.updateRecord).then(this.resetForm)
            }
        },
        updateRecord(){
            this.$emit('update_record')
        },
        stopRecord(){
            const { _id, project, category, description, timeStart } = this.edited
            if (_id){
                const data = { project, category, description, timeStart, timeFinish: Date.now() }
                TimeRecord.Update(_id, data).then(this.updateRecord).then(this.resetForm)
            }
        }
    },
    mounted() {
        this.loadData()
        this.resetForm()
    },
}
</script>

