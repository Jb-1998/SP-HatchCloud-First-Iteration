import React, { useState, useEffect } from "react";
import {render} from 'react-dom'
import {renderToString} from 'react-dom/server'
import { Layout, Menu, Breadcrumb, Modal, Input, Button, Radio, Row, Col, Divider,Upload, Avatar, PageHeader, Typography, Dropdown} from 'antd';
import Form, { Page } from 'react-form-carousel';
import {Form as FormAntDesign} from 'antd';
import {DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    EditOutlined, PlusOutlined,AntDesignOutlined,UserOutlined,LockOutlined, DownCircleFilled} from '@ant-design/icons';
import './style.css'
import 'antd/dist/antd.css';
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import "react-color-palette/lib/css/styles.css";

import { Carousel } from 'react-responsive-carousel';
import jsPDF from "jspdf";
import { ReactComponent as CreateImage } from '../../assets/svg/create.svg';
import { ReactComponent as SlideIconNew } from '../../assets/svg/slideicon2.svg';
import ColorPicker, { useColor } from "react-color-palette";
import ImgCrop from 'antd-img-crop';
import Presentation from '../Presentation/index'


const { Header, Content, Footer, Sider } = Layout;

const {Title} = Typography;

const contentStyle = {
    height: '65vh',
    background: '#fff',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column'
};
const contentStyle2 = {
    height: '100vh',
    background: '#fff',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column'
};
const problemStyle = {
    height: '65vh',
    background: '#fff',
    display: "flex",

};
const problemStyle2 = {
    height: '100vh',
    background: '#fff',
    display: "flex",

};
const { TextArea } = Input;

const { SubMenu } = Menu;
const Main = () => {

    const menu = (
        <Menu style={{borderRadius: 10, height: '25vh', width: '13vw', marginTop: 16}}>
          <Menu.ItemGroup title="Account Settings">
          <Menu.Item icon={<UserOutlined />} style={{fontSize: 16}}>Edit Profile</Menu.Item>
          <Menu.Item icon={<LockOutlined />} style={{fontSize: 16}}>Account Password</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
    );

    const [modalDisplay, setModalDisplay] =  useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalPrimaryVisible, setIsModalPrimaryVisible] = useState(false);
    const [isModalSecondaryVisible, setIsModalSecondaryVisible] = useState(false);
    const [collapsed, setCollapsed] = useState(false)
    const [problemValue, setProblemValue] = useState('');
    const [startupNameValue, setStartUpNameValue] = useState('');
    const [taglineValue, setTaglineValue] = useState('');
    const [primaryColor, setPrimaryColor] = useColor("hex", "#121212");
    const [secondaryColor, setSecondaryColor] = useColor("hex", "#121212");
    const [displayImageFile, setDisplayImageFile] = useState(null)
    const [imageAsFile, setImageAsFile] = useState(null)
    const [presentMode, setPresentMode] = useState(false)

    const [fileList, setFileList] = useState([]);
    
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length === 0) {
            setImageAsFile(null)
            setDisplayImageFile(null)
        } else if(newFileList.length !==0 ){
            setImageAsFile(newFileList[0].originFileObj)
            setDisplayImageFile(URL.createObjectURL(newFileList[0].originFileObj))
        }
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);

    };
    const handleImageAsFile = (e) => {
        setImageAsFile(e.target.files[0])
        setDisplayImageFile(URL.createObjectURL(e.target.files[0]))
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModalPrimary = () => {
        setIsModalPrimaryVisible(true);
    };
    const showModalSecondary = () => {
        setIsModalSecondaryVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleOkPrimary = () => {
        setIsModalPrimaryVisible(false);
    };
    const handleOkSecondary = () => {
        setIsModalSecondaryVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const handleClear = () => {
        setStartUpNameValue('')
        setIsModalVisible(false);
    };

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
      }


    const [form] = FormAntDesign.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const onChangProblem = ({ target: { value } }) => {
        setProblemValue({ value });
    };

    
    
    const Introduction = () => (
        <section style={problemStyle}>
                        
            <div style={{flexDirection: 'row', display: 'flex'}}>
                <div style={{marginLeft: 50, flexDirection: 'column', marginTop: 250, width: 600}}>
                    <p style={{fontSize: 40, fontFamily: 'Gilroy-ExtraBold', textAlign: 'start'}}>{startupNameValue}</p>
                    <p style={{fontSize: 18, fontFamily: 'Gilroy-Light', textAlign: 'start', width: 400, marginTop: -30  }}>{taglineValue}</p>
                    <div style={{width: 100, height: 20, borderWidth: 1,borderStyle: 'solid', borderColor: 'transparent', backgroundColor: `${primaryColor.hex}`}}></div>
                </div>
                {
                    imageAsFile ?
                    <div>  
                        {
                            displayImageFile ? 

                            <img src={displayImageFile} style={{width: '100%',  objectFit: 'cover',height: '65vh', backgroundSize: 'cover', }}/>
                            :
                            null
                        }
                    </div>
                    :
                    null
                }                    
            </div>
        </section>
    )

    const print = () => {
        const introduction = renderToString(<Introduction />);
        console.log(introduction)
        const pdf = new jsPDF("l", "mm", "a4");
        pdf.fromHTML(introduction);
        pdf.save();
    }
    
    return (
        <>  
        {
            presentMode ? 
            <>
                                        <Button onClick={() => {
                setPresentMode(false)
            }} style={{backgroundColor: 'transparent', marginBottom: 10}} >Edit Mode</Button>
            <Carousel autoFocus={true} showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode">
                <div>
                        <section  key="content-0" style={problemStyle2}>
                        
                        <div style={{flexDirection: 'row', display: 'flex'}}>
                            <div style={{marginLeft: 50, flexDirection: 'column', marginTop: 250, width: '105vh'}}>
                                <p style={{fontSize: 40, fontFamily: 'Gilroy-ExtraBold', textAlign: 'start'}}>{startupNameValue}</p>
                                <p style={{fontSize: 18, fontFamily: 'Gilroy-Light', textAlign: 'start', width: 400, marginTop: -30  }}>{taglineValue}</p>
                                <div style={{width: 100, height: 20, borderWidth: 1,borderStyle: 'solid', borderColor: 'transparent', backgroundColor: `${primaryColor.hex}`}}></div>
                            </div>
                            {
                                imageAsFile ?
                                <div>  
                                    {
                                        displayImageFile ? 

                                        <img src={displayImageFile} style={{width: '100%',  objectFit: 'cover',height: '100vh', backgroundSize: 'cover', }}/>
                                        :
                                        null
                                    }
                                </div>
                                :
                                null
                            }                    
                            </div>
                        </section>
                </div>
                <div>
                    <h3 style={contentStyle2} key="content-1">Solution Part Goes Here</h3>
                </div>
                <div>
                <h3 style={contentStyle2} key="content-2">Product Part Goes Here</h3>
                </div>
            </Carousel>
            </>
            :
            <Layout  style={{ minHeight: '100vh' }}>

        <Layout>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={"BrandUI"}
                subTitle={"Create Your Pitch Deck"}
                style={{backgroundColor: '#fff'}}
                extra={[
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                        <Avatar
                            size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }}
                            icon={<AntDesignOutlined />}
                        />
                        <Title style={{fontSize: 15, marginRight: 10}}>John Benedick Sta. Romana</Title>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a style={{textDecoration: 'none', color: 'gray'}} onClick={e => e.preventDefault()}>
                            <DownCircleFilled style={{fontSize: 20, fontWeight: 'bold'}}/>
                            </a>
                        </Dropdown>
                    </div>
                ]}
            /> 
            <Content style={{padding: "0 350px"}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Slide</Breadcrumb.Item>
                <Breadcrumb.Item>Slide Maker</Breadcrumb.Item>
            </Breadcrumb>
            <Button onClick={showModal} style={{backgroundColor: 'transparent', marginBottom: 10}} icon={startupNameValue ? <EditOutlined/> : <PlusOutlined/>} >{ startupNameValue ? "Edit": "Create"}</Button>
            <Button onClick={print} style={{backgroundColor: 'transparent', marginBottom: 10}} >Export as pdf</Button>
            <Button onClick={() => {
                setPresentMode(true)
            }} style={{backgroundColor: 'transparent', marginBottom: 10}} >Present</Button>
            <Modal title={<div style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>Select Primary Color</div>}  visible={isModalPrimaryVisible} onCancel={handleOkPrimary} footer={[
                <Button key="back" type="primary" onClick={handleOkPrimary}>
                Done
                </Button>
            ]}>
                <ColorPicker width={470} height={228} color={primaryColor} onChange={setPrimaryColor} hideHSB light />
            </Modal>
            <Modal title={<div style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>Select Primary Color</div>}  visible={isModalSecondaryVisible} onCancel={handleOkSecondary} footer={[
                <Button key="back" type="primary" onClick={handleOkSecondary}>
                    Done
                </Button>
            ]}>
                <ColorPicker width={470} height={228} color={secondaryColor} onChange={setSecondaryColor} hideHSB light />
            </Modal>
            <Modal title={<div style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}><SlideIconNew/>&nbsp; Slide Maker</div>} visible={isModalVisible} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleClear}>
                    Clear
                </Button>,
                <Button key="back" type="primary" onClick={handleOk}>
                    Done
                </Button>
            ]}
            width={450}>
                <Form onSubmit={handleOk} navigation removeDefaultStyle={false} autoHeight >
                    <Page style={{border: 0, borderColor: 'white'}}>
                        <FormAntDesign
                            form={form}
                            layout="vertical"
                            initialValues={{
                                requiredMarkValue: requiredMark,
                            }}
                            onValuesChange={onRequiredTypeChange}
                            requiredMark={requiredMark}
                            >
                            <p className="title-style">Introduction</p>
                            <FormAntDesign.Item label="Start Up Name / Product Name" required tooltip="This is a required field">
                                <Input placeholder="input placeholder" value={startupNameValue} onChange={(e) => setStartUpNameValue(e.target.value)}/>
                            </FormAntDesign.Item>
                            <FormAntDesign.Item label="Company Tagline" required tooltip="This is a required field">
                                <Input placeholder="input placeholder" value={taglineValue} onChange={(e) => setTaglineValue(e.target.value)}/>
                            </FormAntDesign.Item>
                            <FormAntDesign.Item label="Color Branding" required tooltip="Choose color that will be used for your pitch deck. Colors has primary and secondary color">
                                <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                                    <Button onClick={showModalPrimary}>
                                        Select Color
                                    </Button>
                                    &nbsp;
                                    Primary Color:
                                    &nbsp;
                                    <div style={{backgroundColor: `${primaryColor.hex}`, width: 20, height: 20, borderWidth: 1, borderColor: "black", borderStyle: 'solid'}}>
                                    </div>
                                </div>
                                <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 10}}>
                                    <Button onClick={showModalSecondary}>
                                        Select Color
                                    </Button>
                                    &nbsp;
                                    Secondary Color:
                                    &nbsp;
                                    <div style={{backgroundColor: `${secondaryColor.hex}`, width: 20, height: 20, borderWidth: 1, borderColor: "black", borderStyle: 'solid'}}>
                                    </div>
                                </div>                             
                            </FormAntDesign.Item>
                        </FormAntDesign>
                    </Page>
                    <Page>
                        <FormAntDesign
                            form={form}
                            layout="vertical"
                            initialValues={{
                                requiredMarkValue: requiredMark,
                            }}
                            onValuesChange={onRequiredTypeChange}
                            requiredMark={requiredMark}
                            >
                            <FormAntDesign.Item label="Image" required tooltip="Choose Image that will represent your company tagline and brand">
                                <ImgCrop rotate>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>                            
                            </FormAntDesign.Item>
                        </FormAntDesign>
                    </Page>
                    
                    {/**IF YOU WANT TO ADD ANOTHER PAGE FOR YOUR FORMS JUST ADD <Page></Page> COMPONENT. EACH PAGE COMPONENT HAS CHILD OF FORM COMPONENT */}
                    {/* <Page>
                        /** //////////////// IF YOU WANT TO ADD ANOTHER FORM JUST USE THIS CODE. EACH FORM HAS CHILD COMPONENTS OF FORM.ITEM *
                        <FormAntDesign
                            form={form}
                            layout="vertical"
                            initialValues={{
                                requiredMarkValue: requiredMark,
                            }}
                            onValuesChange={onRequiredTypeChange}
                            requiredMark={requiredMark}
                            >
                            <p className="title-style">Problem Highlights</p>
                            <FormAntDesign.Item label="What is the main problem that you're trying to solve?" required tooltip="This is a required field">
                                <TextArea
                                value={problemValue}
                                onChange={e => setProblemValue(e.target.value)}
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            </FormAntDesign.Item>
                        </FormAntDesign>
                    </Page> */}
                </Form>
            </Modal>
            

            {/** JUST FOCUS ON THIS COMPONENTS FOR BUILDING SLIDE LAYOUT. EACH SLIDE IS DIVIDED USING <div> TAGS.*/}
            {/** ALSO PLEASE KEEP IN MIND THE STYLING FOR EACH SLIDE. IT USES INLINE CSS OF STYLING AND ALSO YOU CAN ADD INTERNAL STYLE ABOVE e.g. (problemStyle, contentStyle) */}

            <Carousel>
                <div>
                    {
                        startupNameValue ?

                        <section style={problemStyle}>
                        
                        <div style={{flexDirection: 'row', display: 'flex'}}>
                            <div style={{marginLeft: 50, flexDirection: 'column', marginTop: 250, width: 600}}>
                                <p style={{fontSize: 40, fontFamily: 'Gilroy-ExtraBold', textAlign: 'start'}}>{startupNameValue}</p>
                                <p style={{fontSize: 18, fontFamily: 'Gilroy-Light', textAlign: 'start', width: 400, marginTop: -30  }}>{taglineValue}</p>
                                <div style={{width: 100, height: 20, borderWidth: 1,borderStyle: 'solid', borderColor: 'transparent', backgroundColor: `${primaryColor.hex}`}}></div>
                            </div>
                            {
                                imageAsFile ?
                                <div>  
                                    {
                                        displayImageFile ? 

                                        <img src={displayImageFile} style={{width: '100%',  objectFit: 'cover',height: '65vh', backgroundSize: 'cover', }}/>
                                        :
                                        null
                                    }
                                </div>
                                :
                                null
                            }                    
                            </div>
                        </section>
                        :
                        <section style={contentStyle}>
                            <p style={{fontSize: 26, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Gilroy-ExtraBold'}}>Start designing your pitch deck</p>
                            <Row style={{marginRight: 30}}>
                                <CreateImage/>            
                            </Row>
                        </section>
                    }
                </div>
                <div>
                <h3 style={contentStyle}>Problem Part Goes Here</h3>
                </div>
                <div>
                <h3 style={contentStyle}>Solution Part Goes Here</h3>
                </div>
                <div style={contentStyle}>

                </div>
            </Carousel>
            </Content>
            <Footer style={{ textAlign: 'center', marginTop: -30 }}>BrandUI ©2021</Footer>
        </Layout>
        </Layout>
        }  
        
        </>
    )
}



export default Main;