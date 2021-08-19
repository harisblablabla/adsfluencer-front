import React, {useState,useEffect} from 'react';
import {Container,Row,Col, Card, Form, Button} from 'react-bootstrap'
import InputRange from 'react-input-range';
import {koneksi} from "../environment";
import Axios from 'axios';
import {getHeaderAuth} from '../helper/service'


const apiUrl = 'https://x.rajaapi.com/MeP7c5ne'

function QuickAds() {
    const [form,setForm] = useState({
        adsname: '',
        description: '',
        upload_at: 0,
        ads_category: [],
        category: '',
        interest: '',
        audience_name: '',
        value: { min: 15, max: 45 },
    })
    const [formStatus,setFormStatus] = useState(false)
    const [token,setToken] = useState('')
    const [location,setLocation] = useState({
        provinsi: [],
        kabupaten: [],
        kecamatan: []
    })

    const handleOnChanges = (e) => {
        setForm(prevState => {return {
            ...prevState,adsname: e.target.value
        }})
    }

    const uploadChange = (e) => {
        setForm(prevState => {
            return {...prevState,upload_at:e.target.value}
        })
    }

    const getDataProvinsi = () => {
        Axios.get('https://x.rajaapi.com/poe')
          .then((res) => {
              if(res.data.success){
                  setToken(res.data.token)
                  Axios.get(`https://x.rajaapi.com/MeP7c5ne${res.data.token}/m/wilayah/provinsi`)
                  .then((resData) => {
                      console.log(resData.data.data)
                      setLocation(prevState => {return {
                        ...prevState,provinsi:resData.data.data
                    }})
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }

    const onChangeProvHandler = (event) => {
        setLocation(prevState => {return {...prevState,kabupaten:[],kecamatan:[]}})
        // this.refs.kab.value = 0
        Axios.get(`${apiUrl}${token}/m/wilayah/kabupaten?idpropinsi=${event.target.value}`)
        .then((res) => {
            if(res.data.success){
                setLocation(prevState => {return { ...prevState,kabupaten:res.data.data}})
            }
        })
        .catch((err) => {
            console.log(err)
            // this.setState({modalOpen : true, error : "Pastikan Perangkat Anda Terhubung dengan Internet"})
        })
    }

    const onChangeKabHandler = (event) => {
        setLocation(prevState => {return {...prevState,kecamatan:[]}})
        // this.refs.kec.value = 0
        Axios.get(`${apiUrl}${token}/m/wilayah/kecamatan?idkabupaten=${event.target.value}`)
        .then((res) => {
            if(res.data.success){
                setLocation(prevState => {return { ...prevState,kecamatan:res.data.data}})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const renderOption = (state) => {
        var jsx =  state.map((val) => {
            return(
                <option key={val.id}  value={val.id} > {val.name} </option>
            )
        })
        return jsx
    }

    const getCategoryAds = () =>{
        Axios.get(`${koneksi}/project/category-ads`, getHeaderAuth())
        .then((res)=>{
            setForm(prevState => {return {
                ...prevState,ads_category:res.data
            }})
        }).catch((err)=>{
          console.log(err)
        })
      }

    const optionDataCategory = () =>{
        const data = form.ads_category.map((item)=>{
          return (
            <option key={item.id} value={item.id}>{item.name}</option>                
          )
        })
        return data
      }
    
      useEffect( () => {
          getCategoryAds()
          getDataProvinsi()
      },[])

    const CardOne = () => {
        return(
            <div>
                <h1>{form.adsname}</h1>
                <Card style={{ width: '100%', borderRadius: '1em' }}>
                    <Form className={"px-4 pt-4"}>
                    <h3>Product Details</h3>
                        <Form.Group className={'col-6 pt-4'}>
                            <Form.Label>Ads Name</Form.Label>
                            <br></br>
                            <Form.Text className="text-muted">type your ads name, you should type it clearly</Form.Text>
                            <Form.Control type="text" defaultValue={form.adsname} onChange={handleOnChanges}/>
                        </Form.Group>
                        <Form.Group className={'col-6 pt-4'}>
                            <Form.Label>Description</Form.Label>
                            <br></br>
                            <Form.Text className="text-muted">complete description for your advertisement</Form.Text>
                            <Form.Control as="textarea" rows={3} value={form.description} onChange={e => setForm(prevState => {
                    return {...prevState,description:e.target.value}
                })} />
                        </Form.Group>
                        <Form.Group className={'col-6 pt-4'}>
                            <Form.Label>Where you wanna post this ads?</Form.Label>
                            <br></br>
                            <Form.Check
                                type="radio"
                                label="instagram post"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value={1}
                                onClick={uploadChange}
                                />
                            <Form.Check
                                type="radio"
                                label="instagram story"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value={2}
                                onClick={uploadChange}
                                />
                            <Form.Check
                                type="radio"
                                label="both of them"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value={3}
                                onClick={uploadChange}
                                />
                        </Form.Group>
                        <Form.Group className={'col-6 py-4'}>
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Label>Upload Details</Form.File.Label>
                            <br></br>
                            <Form.File.Input />
                        </Form.File>
                        </Form.Group>
                        <Button className={'my-5'} style={{float:'right'}} onClick={() => setFormStatus(true)}>Next Step</Button>
                    </Form>
                </Card>
            </div>
        )
    }

    const CardTwo = () => {
        return(
            <div>
                <h1>{form.category}</h1>
                <Card style={{ width: '100%', borderRadius: '1em' }}>
                    <Form className={"px-4 pt-4"}>
                    <h3>Target Audience</h3>
                        <Form.Group className={'col-6 col-md-5 pt-4'}>
                            <Form.Label>Ads Category</Form.Label>
                            <br></br>
                            <Form.Text className="text-muted">choose your ads category</Form.Text>
                            <Form.Control as="select" defaultValue="others" onChange={(e) => setForm(prevState => {return {...prevState,category:e.target.value}})}>
                                <option>...</option>
                                {optionDataCategory()}
                                <option value="x">Others</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className={'col-6 col-md-5 pt-4'}>
                            <Form.Label>Interest</Form.Label>
                            <br></br>
                            <Form.Text className="text-muted">type audience interest</Form.Text>
                            <Form.Control type="text" value={form.interest} onChange={(e) => setForm(prevState => {return {...prevState,interest:e.target.value}})}/>
                        </Form.Group>
                        <Form.Group className={'col-6 pt-4'}>
                            <Form.Label>Audience Name</Form.Label>
                            <br></br>
                            <Form.Text className="text-muted">type your audience name</Form.Text>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className={'col-6 pt-4'}>
                            <Form.Label>Location</Form.Label>
                            <br></br>
                            <Form.Control as="select" defaultValue={0} className={'col-4'} onChange={onChangeProvHandler}>
                                     <option value={0} disabled> Pilih Provinsi </option>
                                     {renderOption(location.provinsi)}
                            </Form.Control>
                            <Form.Control as="select" defaultValue={0} className={'col-4'} onChange={onChangeKabHandler}>
                                     <option value={0} disabled> pilih kabupaten </option>
                                     {renderOption(location.kabupaten)}
                            </Form.Control>
                            <Form.Control as="select" defaultValue={0} className={'col-4'}>
                                     <option value={0} disabled> pilih kecamatan </option>
                                     {renderOption(location.kecamatan)}
                            </Form.Control>
                        </Form.Group>
                        <br></br>
                        <div className="col-6">
                        <InputRange
                                maxValue={65}
                                minValue={8}
                                formatLabel={value => `${value} Tahun`}
                                value={form.value}
                                onChange={value => setForm(prevState => {return {...prevState,value:value}})}
                                onChangeComplete={value => console.log(value)} />
                        </div>
                        <Button className={'my-5'} style={{float:'left'}} onClick={() => setFormStatus(false)}>Back</Button>
                        <Button className={'my-5'} style={{float:'right'}}>Submit</Button>
                    </Form>
                </Card>
            </div>
        )
    }

    console.log(formStatus)
    return (
        <div>
            <Container>
            <Row>
                <Col>
                <h2 className={"p-5"}>Quick Ads</h2>
                {!formStatus ? CardOne():CardTwo()  }
                </Col>
            </Row>
            </Container>
        </div>
    )
}


export default QuickAds;