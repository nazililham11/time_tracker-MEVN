<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-6">
                <category-form 
                    :edited="edited"
                    v-on:update_categories="loadCategory"
                    v-on:reset_form="edited._id = undefined"
                    />
            </div>

            <div class="col-6">
                <div class="row mb-2" v-for="(category, i) in categories" :key="i">
                    <div class="col-12">
                        <category-item 
                            :data="category" 
                            v-on:edit="prepareEditCategory(i)"
                            v-on:delete="deleteCategory(i)"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CategoryForm from "@/components/CategoryForm.vue"

import Category from "@/plugin/category.js"
import Utils from "@/plugin/utils.js"
import CategoryItem from '../components/CategoryItem.vue'

export default {
    name: "Category",
    components: { CategoryForm, CategoryItem },
    data() {
        return {
            edited: {
                _id: undefined
            },
            categories: [],
        }
    },
    methods: {
        toDate: Utils.toDate,
        async loadCategory() {
            this.categories = await Category.Read()
        },
        deleteCategory(index) {
            const id = this.categories[index]._id
            var retVal = confirm("Delete Category will delete all record with?")
            if (retVal == true)
                Category.Remove(id).then(this.loadCategory)
        },
        prepareEditCategory(index) {
            this.edited = this.categories[index]
        },
    },
    mounted() {
        this.loadCategory()
    },
}
</script>
