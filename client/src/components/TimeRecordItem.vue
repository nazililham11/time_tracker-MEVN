<template>
    <div class="card shadow">
        <div class="card-header bg-secondary text-light">
            <div class="d-flex justify-content-between">
                <h6>{{isRunningItems ? 'Running' : toDateString(records.date)}}</h6>
                <h6 v-if="!isRunningItems">{{toTimeSpan(records.timeSpan)}}</h6>
            </div>
        </div>
        <div class="card-body">
            <table class="table">
                <tr v-for="(record, i) in records.data" :key="i">
                    <td style="width:8rem">{{record.project ? record.project.title : "-"}}</td>
                    <td style="width:8rem">{{record.category ? record.category.title : "-"}}</td>
                    <!-- <td style="width:9rem">{{toDateString(record.timeStart)}}</td> -->
                    <td style="width:6rem">
                        {{toTimeString(record.timeStart)}} - {{record.timeFinish ? toTimeString(record.timeFinish) : 'Now'}}
                    </td>
                    <td style="width:9rem"><b>{{toTimeSpan(record.timeSpan)}}</b></td>
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
        records: Object,
        edited: Object
    },
    methods: {
        toTimeString: Utils.toTimeString,
        editRecord(index){
            const r = this.records.data[index]
            const record = {
                ...r,
                project: r.project ? r.project._id : undefined,
                category: r.category ? r.category._id : undefined,
            }
            this.$emit('edit', record)
        },
        deleteRecord(index){
            const id = this.records.data[index]._id
            this.$emit('delete', id)
        }, 
        toDateString(date){
            return new Date(date).toDateString()
        },
        toTimeSpan(timeSpan){
            if (timeSpan){
                return Utils.numberPad(timeSpan.hours, 2) + ':' + Utils.numberPad(timeSpan.minutes, 2) + ':00'
            } else {
                return "Running"
            }
        }
    },
    computed:{
        isRunningItems(){
            return this.records.date == "Running"
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