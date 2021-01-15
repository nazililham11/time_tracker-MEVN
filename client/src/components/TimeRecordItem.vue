<template>
    <div class="card shadow">
        <div class="card-header bg-secondary text-light">
            <h5>All Records</h5>
        </div>
        <div class="card-body">
            <table class="table">
                <tr v-for="(record, i) in records" :key="i">
                    <td style="width:8rem">{{record.project ? record.project.title : "-"}}</td>
                    <td style="width:8rem">{{record.category ? record.category.title : "-"}}</td>
                    <td style="width:9rem">{{new Date(record.timeStart).toDateString()}}</td>
                    <td style="width:6rem">
                        {{toTimeString(record.timeStart)}} - {{record.timeFinish ? toTimeString(record.timeFinish) : 'Now'}}
                    </td>
                    <td style="width:9rem">{{record.description}}</td>
                    <td style="width:8rem;">
                        <button class="btn btn-sm btn-primary mr-2" v-on:click="editRecord(i)">Edit</button>
                        <button class="btn btn-sm btn-danger" v-on:click="deleteRecord(i)">Delete</button>
                    </td>
                </tr>
            </table>                    
        </div>
    </div>
</template>

<script>
import Utils from "@/plugin/utils.js"

export default {
    props: {
        records: Array,
        edited: Object
    },
    methods: {
        toTimeString: Utils.toTimeString,
        editRecord(index){
            const r = this.records[index]
            const record = {
                ...r,
                project: r.project ? r.project._id : undefined,
                category: r.category ? r.category._id : undefined,
            }
            this.$emit('edit', record)
        },
        deleteRecord(index){
            const id = this.records[index]._id
            this.$emit('delete', id)
        }
    }
}
</script>

<style>
    td {
        padding-left: .25rem !important;
        padding-right: .25rem !important;
    }
</style>