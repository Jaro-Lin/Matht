import React from 'react';
import 'antd/dist/antd.css';
import { Tabs, Button, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
const { TabPane } = Tabs;

const initialPanes = [
    { title: 'Tab 1', key: '1' },
];

class editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: initialPanes[0].key,
            panes: initialPanes,
            item: {
                id:null,
                title: "",
                test: "",
            },
            testList: [],
        };
        this.fetchTests = this.fetchTests.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCookie = this.getCookie.bind(this)
    }
    newTabIndex = 2;

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: `Tab ${activeKey}`, key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
            item: {},
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    /*refreshList = () => {
        axios
           .get("http://127.0.0.1:8000/api/tests/")
           .then(res => this.setState({ testList: res.data }))
           .catch(err => console.log(err));
    };*/

    componentWillMount(){
       this.fetchTests()
    }

    fetchTests(){
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/test-list/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        testList:data
      })
      )
    }

    getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
    }

    handleEditorChange = (test) => {
        this.setState({ item: { title: "quiz1", test: test} });
    };

    /*handleSubmit = items => {
        if (items.id!==this.state.id) {
            axios
               .put(`http://127.0.0.1:8000/api/tests/${this.state.id}/`, items)
               .then(res => this.refreshList(), this.setState({id: this.state.id++}));
            return;
        }
        axios
           .post("http://127.0.0.1:8000/api/tests/", items)
           .then(res => this.refreshList());
        alert("Text was submitted: " + items.title);
    }*/

    handleSubmit(e){
    e.preventDefault()
    console.log('ITEM:', this.state.item)

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/test-create/'

    fetch(url, {
      method:'POST',
      mode: 'same-origin',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(this.state.item)
    }).then((response)  => {
        this.fetchTests()
        console.log('database:', this.state.testList)
        this.setState({
         item:{
          id:null,
          title:'',
          test:'',
        }
        })
    }).catch(function(error){
      console.log('ERROR:', error)
    })
    }

    render() {
        const { panes, activeKey } = this.state;
        let items = {...this.state.item}
        return (
        <Tabs type = "editable-card"
            onChange = { this.onChange }
            activeKey = { activeKey }
            onEdit = { this.onEdit }>
            {panes.map(pane => (
                <TabPane tab = { pane.title }
                    key = { pane.key }
                    closable = { pane.closable }>
                    <span value={items.title}/>
                    <Editor
                        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                        initialValue=""
                        value={items.test}
                        init={{
                            height: 500,
                            menubar: true,
                            resize: true,
                            autosave_ask_before_unload: true,
                            image_title: true,
                            automatic_uploads: false,
                            images_upload_url: 'postAcceptor.php',
                            menu: {
                                format: {
                                    title: 'Format',
                                    items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat'
                                },
                            },
                            plugins: [
                                'code link',
                                'searchreplace',
                                'advlist anchor autolink codesample fullscreen help image imagetools',
                                'lists link media noneditable preview',
                                'searchreplace table template visualblocks wordcount',
                                'code preview',
                                'lists',
                                'paste',
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks advcode fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | code preview searchreplace | bold italic backcolor | mybutton | alignleft aligncenter alignright alignjustify | language spellcheckdialog | bullist numlist outdent indent | image link media | removeformat | help',
                            setup: function (editor) {
                                /* Menu items are recreated when the menu is closed and opened, so we need
                                   a variable to store the toggle menu item state. */
                                var i = 0;
                                /* example, adding a toolbar menu button */
                                editor.ui.registry.addMenuButton('mybutton', {
                                    text: 'Add Choice',
                                    fetch: function (callback) {
                                        i++;
                                        var items = [
                                            {
                                                type: 'menuitem',
                                                text: 'FillBlank',
                                                onAction: function () {
                                                    editor.insertContent('<input type="text" id="FB" name="FB">');
                                                }
                                            },
                                            {
                                                type: 'nestedmenuitem',
                                                text: 'SingleChoice',
                                                getSubmenuItems: function () {
                                                    return [
                                                        {
                                                            type: 'menuitem',
                                                            text: 'TorF',
                                                            onAction: function () {
                                                                editor.insertContent('<div id="'+i+'">&nbsp;<label for="T">True. </label>&nbsp;<input type="radio" id="T" name="TorF" value="true"><br>' +
                                                                    '&nbsp;<label for="F">False. </label><input type="radio" id="F" name="TorF" value="false">');
                                                            }
                                                        },
                                                        {
                                                            type: 'menuitem',
                                                            text: '4thChoices',
                                                            onAction: function () {
                                                                editor.insertContent('<div id="'+i+'">&nbsp;<label for="S4A">A. </label><input type="radio" id="S4A" name="4thChoices" value="A"><br>' +
                                                                    '&nbsp;<label for="S4B">B. </label><input type="radio" id="S4B" name="4thChoices" value="B"><br>' +
                                                                    '&nbsp;<label for="S4C">C. </label><input type="radio" id="S4C" name="4thChoices" value="C"><br>' +
                                                                    '&nbsp;<label for="S4D">D. </label><input type="radio" id="S4D" name="4thChoices" value="D">');
                                                            }
                                                        }
                                                    ];
                                                }
                                            },
                                            {
                                                type: 'nestedmenuitem',
                                                text: 'MultiChoices',
                                                getSubmenuItems: function () {
                                                    return [
                                                        {
                                                            type: 'menuitem',
                                                            text: '4thChoices',
                                                            onAction: function () {
                                                                editor.insertContent('<div id="'+i+'">&nbsp;<label for="M4A">A. </label><input type="checkbox" id="M4A" name="4thChoices" value="A"><br>' +
                                                                    '&nbsp;<label for="M4B">B. </label><input type="checkbox" id="M4B" name="4thChoices" value="B"><br>' +
                                                                    '&nbsp;<label for="M4C">C. </label><input type="checkbox" id="M4C" name="4thChoices" value="C"><br>' +
                                                                    '&nbsp;<label for="M4D">D. </label><input type="checkbox" id="M4D" name="4thChoices" value="D">');
                                                            }
                                                        },
                                                        {
                                                            type: 'menuitem',
                                                            text: '5thChoices',
                                                            onAction: function () {
                                                                editor.insertContent('<div id="'+i+'">&nbsp;<label for="M5A">A. </label><input type="checkbox" id="M5A" name="5thChoices" value="A"><br>' +
                                                                    '&nbsp;<label for="M5B">B. </label><input type="checkbox" id="M5B" name="5thChoices" value="B"><br>' +
                                                                    '&nbsp;<label for="M5C">C. </label><input type="checkbox" id="M5C" name="5thChoices" value="C"><br>' +
                                                                    '&nbsp;<label for="M5D">D. </label><input type="checkbox" id="M5D" name="5thChoices" value="D"><br>' +
                                                                    '&nbsp;<label for="M5E">E. </label><input type="checkbox" id="M5E" name="5thChoices" value="E">');
                                                            }
                                                        }
                                                    ];
                                                }
                                            },
                                        ];
                                        callback(items);
                                    }
                                });
                            },
                        }}
                        onEditorChange={this.handleEditorChange}
                    />
                    <div dangerouslySetInnerHTML={{ __html: items.test }} onClick={this.handleSubmit(test)}>
                    </div>
                </TabPane>
                ))
            }
            </Tabs>
        );
    }
}
export default editor;