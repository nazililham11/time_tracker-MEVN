<template>
    <div class="card shadow">
        <div class="card-body">
            <h5 class="card-title">Project</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                {{ form.id ? `Editing ${form.id}` : "Create New Project" }}
            </h6>
            <hr>
            <div class="row">
                <div class="col form-group">
                    <label for="title">Title</label>
                    <input class="form-control" id="title" type="text" v-model="form.title">
                </div>
                <!-- <div class="col-auto form-group">
                    <label for="color">Color</label>
                    <input class="form-control" id="color" type="text" v-model="form.color">
                </div> -->
            </div>

            <div class="row">
                <div class="col form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="4" v-model="form.description"></textarea>
                </div>
            </div>

            <div class="d-flex">
                <button class="btn btn-primary mr-3" v-on:click="submitForm">Submit</button>
                <button class="btn btn-primary mr-3" v-on:click="resetForm">Reset</button>
            </div>
        </div>
    </div>
</template>

<script>

import Project from "@/plugin/project.js"

export default {
    props: {
        edited: Object
    },
    data(){
        return {
            form: {
                id: undefined,
                title: undefined,
                color: undefined,
                description: undefined
            }
        }
    },
    watch: {
        edited(){
            const e = this.edited
            if (e._id){
                this.form.id = e._id
                this.form.title = e.title
                this.form.color = e.color
                this.form.description = e.description
            }
        }
    },
    methods: {
        resetForm() {
            this.form.id = undefined
            this.form.title = ""
            this.form.color = ""
            this.form.description = ""
            this.$emit('reset_form')
        },
        async submitForm() {
            const { title, description } = this.form
            const color = '#007bff'
            if (this.form.id){
                const id = this.form.id
                Project.Update(id, { title, color, description }).then(this.updateProjects).then(this.resetForm)
            } else {
                Project.Insert({ title, color, description }).then(this.updateProjects).then(this.resetForm)
            }
        },
        updateProjects(){
            this.$emit('update_projects')
        }
    }
}
</script>

<style>

</style>