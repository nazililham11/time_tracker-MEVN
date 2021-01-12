<template>
    <div>
        <div style="border: 1px solid black; margin: 1rem; padding: 1rem">
            <h3 style="margin: 0">Create Projects</h3>
            <i>{{ createForm.id ? `Editing ${createForm.id}` : "Create New Project" }}</i>
            <hr>
            <div>
                <div>
                    <label for="title">Title</label><br>
                    <input id="title" type="text" v-model="createForm.title">
                </div>
                <div>
                    <label for="color">Color</label><br>
                    <input id="color" type="text" v-model="createForm.color">
                </div>
                <div>
                    <label for="description">Description</label><br>
                    <textarea id="description" rows="4" v-model="createForm.description"></textarea>
                </div>
                <button v-on:click="submitForm">submit</button>
                <button v-on:click="resetForm">reset</button>
            </div>
        </div>

        <div style="border: 1px solid black; margin: 1rem; padding: 1rem">
            <h3 style="margin: 0">All Projects</h3>
            <hr>
            <ol>
                <li v-for="(project, i) in projects" :key="i" style="border: 1px solid black; margin: 1rem; padding: 1rem">
                    <tr>
                        <td>Title</td>
                        <td>: {{project.title}}</td>
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td>: {{project.color}}</td>
                    </tr>
                    <tr>
                        <td>Date Created</td>
                        <td>: {{toDate(project.dateCreated)}}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>: {{project.description}}</td>
                    </tr>
                    <tr>
                        <td>
                            <button v-on:click="prepareEditProject(i)">Edit</button>
                            <button v-on:click="deleteProject(i)">Delete</button>
                        </td>
                    </tr>
                </li>
            </ol>
        </div>

    </div>
</template>

<script>
import Project from "@/plugin/project.js"
import Utils from "@/plugin/utils.js"

export default {
    name: "Project",
    data() {
        return {
            createForm: {
                id: undefined,
                title: "",
                color: "",
                description: ""
            },
            projects: [],
        }
    },
    methods: {
        toDate: Utils.toDate,
        async loadProject() {
            this.projects = await Project.Read()
        },
        deleteProject(index) {
            const id = this.projects[index]._id
            var retVal = confirm("Delete Project will delete all record with?")
            if (retVal == true)
                Project.Remove(id).then(this.loadProject)
        },
        prepareEditProject(index) {
            const { _id, title, color, description } = this.projects[index]
            this.createForm.id = _id
            this.createForm.title = title
            this.createForm.color = color
            this.createForm.description = description
        },
        resetForm() {
            this.createForm.id = undefined
            this.createForm.title = ""
            this.createForm.color = ""
            this.createForm.description = ""
        },
        submitForm() {
            const { title, color, description } = this.createForm
            if (this.createForm.id){
                const id = this.createForm.id
                Project.Update(id, { title, color, description }).then(this.loadProject).then(this.resetForm)
            } else {
                Project.Insert({ title, color, description }).then(this.loadProject).then(this.resetForm)
            }
        }
    },
    mounted() {
        this.loadProject()
    },
}
</script>
