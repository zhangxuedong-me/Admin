import Vue from 'vue'

import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Checkbox,
    Message,
    Dialog,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    Submenu,
    Notification,
    Loading,
    DatePicker,
    Select,
    Option,
    Tooltip,
    MessageBox,
    Radio,
    RadioGroup,
    Table,
    TableColumn,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Tabs,
    TabPane,
    Link   
      
} from 'element-ui'

Vue.use(Button)
    .use(Card)
    .use(Form)
    .use(FormItem)
    .use(Input)
    .use(Checkbox)
    .use(Dialog)
    .use(Container)
    .use(Header)
    .use(Aside)
    .use(Main)
    .use(Menu)
    .use(MenuItem)
    .use(Submenu)
    .use(Loading)
    .use(DatePicker)
    .use(Select)
    .use(Option)
    .use(Tooltip)
    .use(Radio)
    .use(RadioGroup)
    .use(Table)
    .use(TableColumn)
    .use(Pagination)
    .use(Breadcrumb)
    .use(BreadcrumbItem)
    .use(Tabs)
    .use(TabPane)
    .use(Link)

    
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox