<template>
    <div>
        <div style="border: 1px solid black; margin: 1rem; padding: 1rem">
            <h3 style="margin: 0">Create Categories</h3>
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
            <h3 style="margin: 0">All Categories</h3>
            <hr>
            <ol>
                <li v-for="(category, i) in categories" :key="i" style="border: 1px solid black; margin: 1rem; padding: 1rem">
                    <tr>
                        <td>Title</td>
                        <td>: {{category.title}}</td>
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td>: {{category.color}}</td>
                    </tr>
                    <tr>
                        <td>Date Created</td>
                        <td>: {{toDate(category.dateCreated)}}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>: {{category.description}}</td>
                    </tr>
                    <tr>
                        <td>
                            <button v-on:click="prepareEditCategory(i)">Edit</button>
                            <button v-on:click="deleteCategory(i)">Delete</button>
                        </td>
                    </tr>
                </li>
            </ol>
        </div>

    </div>
</template>

<script>
// Tombol Edit tidak bekerja 
import Category from "@/plugin/category.js"
import Utils from "@/plugin/utils.js"

export default {
    name: "Category",
    data() {
        return {
            createForm: {
                id: undefined,
                title: "",
                color: "",
                description: ""
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
            const { _id, title, color, description } = this.categories[index]
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
        async submitForm() {
            const { title, color, description } = this.createForm
            if (this.createForm.id){
                const id = this.createForm.id
                Category.Update(id, { title, color, description }).then(this.loadCategory).then(this.resetForm)
            } else {
                Category.Insert({ title, color, description }).then(this.loadCategory).then(this.resetForm)
            }
        }
    },
    mounted() {
        this.loadCategory()
    },
}
</script>
