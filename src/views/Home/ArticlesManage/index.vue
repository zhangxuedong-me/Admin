<template>
    <div class="container">
        <el-card class="card_container">
        <div slot="header">
        <div class="article_search">
            <el-form ref="search_form" label-width="100px" label-position="right">
                <el-form-item label="文章的状态">
                    <el-radio-group text-color="#ffffff" v-model="article.status">
                        <el-radio :label="0">全部</el-radio>
                        <el-radio :label="1">草稿</el-radio>
                        <el-radio :label="2">待审核</el-radio>
                        <el-radio :label="3">审核通过</el-radio>
                        <el-radio :label="4">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="创建的时间">
                    <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="article.publish_time"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="分类列表">
                    <el-select
                        v-model="article.selectVal"
                        placeholder="请选择"
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in classData"
                            :key="index"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章的关键字">
                    <el-input
                        placeholder="请输入文章的关键字"
                        v-model="article.article_keyword"
                        clearable
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button @click="searchBtn(true)" class="search_btn" type="primary">搜索</el-button>
        </div>
        </div>
        <div class="articles_result">
            <div class="articles_result_title">
                <span>共 找 到 </span>
                <span class="total_page">
                    {{ articleResult ? articleResult.length : 0 }}
                </span>
                <span>条 记 录</span> 
            </div>
            <el-table
                :data="articleResult | statusFilter"
                style="width: 100%"
                highlight-current-row
                cell-class-name="red"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                    width="80"
                >
                </el-table-column>
                <el-table-column
                    prop="article_title"
                    label="文章标题"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="article_auther"
                    label="文章作者"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="publish_time"
                    label="文章创建时间"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="selectVal"
                    label="所属分类"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="statusContent"
                    label="审核状态"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="210"
                >
                <template slot-scope="scope">
                    <el-button
                        @click="prohibitAndRecovery(scope.row)"
                        :type="scope.row.isProhibit ? 'warning' : 'primary'"
                        size="small"
                    >
                        {{ scope.row.isProhibit ? '禁止' : '恢复' }}
                    </el-button>
                    <el-button
                        type="success"
                        size="small"
                        @click="editArticle(scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button @click="deleteArticle(scope.row)" type="danger" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="articleData.total"
                :page-size="article.count"
                :current-page.sync="article.page"
                prev-text="上一页"
                next-text="下一页"
                @current-change="pageChange"
            >
            </el-pagination>
        </div>
        </el-card>
    </div>
</template>

<script>
import {
    getArticleData,
    getClassificationData,
    deleteArticle,
    prohibitAndRecovery

}  from '@/api/articles.js'
export default {
    name: 'articles_manage',
    props: {

    },
    data() {
        return {

            // 搜索项的数据
            article: {
                status: 0,
                publish_time: [],
                selectVal: '',
                article_keyword: '',
                id: this.$store.getters.getuserInfo.id,
                count: 6,
                page: 1,
            },
            articleResult: [],

            articleData: {},

            classData: [],

            startHttp: true,

            msg: ''
        }
    },
    beforeCreate () {
        this.$notify({
            
          title: '尊敬的用户您好',
          message: '请谨慎操作，以免造成不必要的损失!',
          type: 'warning'
        })
    },
    methods: {

        // 获取相关条件的文章
        async searchBtn (flag) {

            // 如果搜索条件变化了再去发送请求
            if (!this.startHttp) {

                this.$message.success(this.msg)
                return
            }

            // 文章的加载状态
            const loading = this.$loading(this.$store.state.loading)
            
            try {

                // 搜索文章的请求
                const { data } = await getArticleData(this.article)

                this.msg = data.message

                // 如果点击的是搜索按钮的话，将页数重置为第一页
                if (flag) {

                    this.article.page = 1
                    this.$message.success(data.message)
                }
                
                this.startHttp = false

                this.articleData = data
                this.articleResult = data.data

            } finally {

                loading.close()
            }
        },

        // 获取文章分类接口数据
        async getClassData () {

            const { data } = await getClassificationData({ id: 1})

            this.classData = data.data
        },

        // 点击之后切换页码
        pageChange (page) {

           this.article.page = page

           this.searchBtn()
        },

        // 删除文章
        async deleteArticle (obj) {

            try {

                await this.$confirm.confirm('真的要删除吗，删除之后无法找回？', '提示', {
                    type: 'warning'
                })

                const { data } = await deleteArticle({

                    detailId: obj.detailId, 
                    id: this.$store.getters.getuserInfo.id
                })

                // 删除成功之后，从对应的文章数据中删除该文章
                this.articleResult.forEach((item, index) => {
                    
                    if (item.detailId === obj.detailId) {

                        this.articleResult.splice(index, 1)
                        return
                    }
                })

                this.$message.success(data.message)

                this.article.page = 1

            } catch(error) {

                error === 'cancel' ? this.$message('取消删除') : ''
                
            }
        },

        // 禁止发布文章
        async prohibitAndRecovery (item) {
            
            try {

                await this.$confirm.confirm('真的要操作此文章吗?', '提示', {
                    type: 'warning'
                })

                const { data } = await prohibitAndRecovery({ detailId: item.detailId })
                item.isProhibit = !item.isProhibit

                this.$message.success(data.message)

            } catch (error) {
                    
                error === 'cancel' ? this.$message('已取消') : ''
            }
        },

        // 编辑文章的事件
        editArticle (row) {

            // 订阅事件告诉修改文章页面可以销毁了

            this.$event.$emit('removePage')

            this.$router.replace(`/edit_article/${row.detailId}`)
        }
        
    },
    computed: {

    },
    created() {
        this.searchBtn()
        this.getClassData()
    },
    mounted() {
        
        this.$event.$on('removeArticle', () => {

            this.$store.commit('REMOVE_CACHE', 'articles_manage')
        })
    },
    watch: {

        article: {

            handler: function(newVal, oldVal) {

                this.startHttp = true

                // 如果当前页面的数据删除完毕去获取上页数据
                if (!this.articleResult.length) {

                    if (this.article.page >= 1) {

                        this.searchBtn()
                    }
                }
            },

            deep: true
        }
    },
    components: {

    },
    beforeRouteEnter (to, from, next) {

        next(vm => {
            
            vm.$store.commit('ADD_CACHE', to.name)
        })
    }  
}
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100vh;
        padding: 60px 20px 0 20px;
        box-sizing: border-box;
        .card_container {
            margin-bottom: 100px;
        }
        .article_search {
            background: rgba(176, 130, 233, .8);
            padding: 2px 30px;
            /deep/ .el-form-item {
                padding-top: 6px;
                .el-form-item__label {
                    color: #737372;
                }
                /deep/ .el-radio-group {
                    .el-radio {
                        .el-radio__label {
                            color: #4ea8f5;
                        }
                    }
                    .is-checked {
                         .el-radio__label {
                            color: #ffffff;
                        }
                    }
                   
                }
                .el-input__inner {
                    width: 260px;
                }
            }
            .search_btn {
                margin-bottom: 20px;
                padding: 10px 100px;
                margin-left: 100px;
                margin-top: 20px;
            }
        }
        .articles_result {
            .articles_result_title {
                height: 50px;
                background: #90e1f9;
                border-radius: 6px 6px 0 0;
                line-height: 50px;
                font-size: 18px;
                color: #ffffff;
                text-align: center;
                .total_page {
                    color: #f96d3c;
                }
            }
            .el-table {
                border: #90e1f9 solid 1px;
                border-radius: 0 0 6px 6px;
                padding-bottom: 20px;
                /deep/ .el-table__header-wrapper {
                    .el-table__header {
                        .has-gutter {
                            tr {
                                .is-leaf {
                                    text-align: center;
                                }
                            }
                        }
                    }
                }

                /deep/ .el-table__body-wrapper {
                    .el-table__body {
                        .el-table__row {
                            text-align: center;
                            .red {
                                color: #3d91f8;
                                text-align: center;
                            }
                        }
                    }
                }

            }
            .el-pagination {

                margin-top: 30px;
                text-align: center;
            }
        }
    }
</style>
