<template>
    <div id="app">
        <nav class="navbar navbar-dark bg-primary fixed-top">
            <a class="navbar-brand text-uppercase">Time Tracker</a>
            <div class="d-flex flex-row ml-4 mr-auto">
                <router-link v-bind="navBind('/record')">Time Record</router-link>
                <router-link v-bind="navBind('/project')">Project</router-link> 
                <router-link v-bind="navBind('/category')">Category</router-link> 
            </div>
        </nav>
        <router-view style="margin-top: 4.5rem"/>
    </div>
</template>

<script>
export default {
    methods:{
        navBind(to){
            return {
                class: 'btn mr-2 ' + (this.currentRoute != to ? 'btn-light':'btn-outline-light'),
                to: to
            }
        }
    },
    computed: {
        currentRoute() {
            return this.$route.path
        },
    },
}
</script>

<style>

</style>
