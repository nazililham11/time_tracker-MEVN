<template>
    <div class="card shadow">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column">
                    <h5 class="card-title m-0">{{data.title}}</h5>
                    <small class="text-muted">{{data.color}}</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-primary btn-sm"
                        v-on:click="editProject">Edit</button>
                    <button class="btn btn-outline-danger btn-sm ml-2"
                        v-on:click="deleteProject">Delete</button>
                </div>
            </div>
            <p>{{data.description}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: {
                id: undefined,
                title: '',
                color: '',
                description: ''
            }
        }
    },
    methods: {
        deleteProject(){ 
            this.$emit('delete')
        },
        editProject(){
            this.$emit('edit')
        }
    }
}
</script>

<style>

</style>