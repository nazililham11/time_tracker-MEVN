<template>
    <div class="container-fluid">
        
        <div class="row">
            <div class="col-6">
                <project-form 
                    v-on:update_projects="loadProject"
                    v-on:reset_form="edited._id = undefined"
                    :edited="edited"
                    />
            </div>
            <div class="col-6">
                <div class="row mb-2" v-for="(project, i) in projects" :key="i">
                    <div class="col-12">
                        <project-item :data="project" 
                            v-on:edit="prepareEditProject(i)"
                            v-on:delete="deleteProject(i)"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectForm from "@/components/ProjectForm.vue"

import Project from "@/plugin/project.js"
import Utils from "@/plugin/utils.js"
import ProjectItem from '@/components/ProjectItem.vue'

export default {
    name: "Project",
    components: { ProjectForm, ProjectItem },
    data() {
        return {
            edited: {
                _id: undefined,
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
            this.edited = this.projects[index]
        },
    },
    mounted() {
        this.loadProject()
    },
}
</script>
