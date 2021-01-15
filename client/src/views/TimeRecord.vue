<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <time-record-form 
                    v-on:update_record="loadData" 
                    v-on:reset_form="edited._id = undefined"
                    :edited="edited"
                    />
            </div>
        </div>

        <div class="row my-3">
            <div class="col">
                <time-record-item 
                    :records="records" 
                    v-on:edit="editRecord"
                    v-on:delete="deleteRecord"
                    />
            </div>
        </div>
    </div>
</template>

<script>

import TimeRecord from "@/plugin/timeRecord.js"

import TimeRecordForm from "@/components/TimeRecordForm.vue"
import TimeRecordItem from "@/components/TimeRecordItem.vue"

export default {
    name: "TimeRecord",
    components: { TimeRecordForm, TimeRecordItem },
    data() {
        return {
            records: [],
            edited: {
                _id: undefined,
                project: undefined,
                description: undefined,
                category: undefined,
                timeStart: undefined,
                timeFinish: undefined
            }
        }
    },
    methods: {
        async loadData() {
            this.records = await TimeRecord.Read()
        },
        editRecord(data){
            this.edited = data
        },
        deleteRecord(id){
            if (id){
                var retVal = confirm("Are you sure want delete this record?")
                if (retVal == true)
                    TimeRecord.Remove(id).then(this.loadData)
            }
        }
    },
    mounted() {
        this.loadData()
    },
}
</script>

