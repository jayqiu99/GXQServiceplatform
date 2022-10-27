<template>
    <div>
        <el-dialog title="选址" :visible.sync="dialogVisible" width="50%" :append-to-body='true'>
            <span>
                <gd-map width="700px" height="500px"></gd-map>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import GdMap from './MapZj.vue'
    import Vue from 'vue'
    export default {
        name: 'mapdome',
        components: {
            GdMap
        },
        data() {
            return {
                dialogVisible: false,

            };
        },
        created() {

        },
        methods: { 

            edit() {
                console.log("触发地图");
                this.dialogVisible = true;
            },
        }
    };
</script>