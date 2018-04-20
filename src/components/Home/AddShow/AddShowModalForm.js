import React from 'react';
import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Input,
    DatePicker
  } from 'antd';
  const FormItem = Form.Item;
  const Option = Select.Option;
  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;
  const { TextArea } = Input;
  const RangePicker = DatePicker.RangePicker;
  export default class Demo extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        // Should format date value before submit.
        const rangeValue = values['range-picker'];
        
        const submittedValues = {
            ...values,
            'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
            //,
            // 'range-time-picker': [
            //   rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            //   rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
            // ],
            // 'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
          };

        if (!err) {
          console.log('Received values of form: ', submittedValues);
        }
      });
    }
    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Form onSubmit={this.handleSubmit}>
            <FormItem
                label="Name"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your note!' }],
                })(
                <Input />
                )}
            </FormItem>
            <FormItem
                label="Description"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 18 }}
            >
                {getFieldDecorator('description', {
                    rules: [{ required: false, message: 'Please provide a description abour your series.!' }],
                })(
                    <TextArea placeholder="Write a description about the series." autosize={{ minRows: 2, maxRows: 6 }} />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="RangePicker"
            >
                {getFieldDecorator('range-picker', {
                    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                  })(
                    <RangePicker />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="Origin"
                hasFeedback
            >
                {getFieldDecorator('select', {
                rules: [
                    { required: true, message: 'Please select your country!' },
                ],
                })(
                <Select placeholder="Please select a country">
                    <Option value="china">China</Option>
                    <Option value="use">U.S.A</Option>
                </Select>
                )}
            </FormItem>
    
            <FormItem
                {...formItemLayout}
                label="Genres"
            >
                {getFieldDecorator('genres', {
                rules: [
                    { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
                })(
                <Select mode="multiple" placeholder="Please select genres">
                    <Option value="Action">Action</Option>
                    <Option value="Comedy">Comedy</Option>
                    <Option value="Sci-Fi">Sci-Fi</Option>
                    <Option value="Drama">Drama</Option>
                    <Option value="Thriller">Thriller</Option>
                </Select>
                )}
                <span className="ant-form-text"> (multiple)</span>
            </FormItem>
    
            <FormItem
                {...formItemLayout}
                label="Seasons"
            >
                {getFieldDecorator('seasons', { initialValue: 1 })(
                <InputNumber min={1} max={100} />
                )}

            </FormItem>
    
            <FormItem
                {...formItemLayout}
                label="In production"
            >
                {getFieldDecorator('in-production', { valuePropName: 'checked' })(
                <Switch />
                )}
            </FormItem>
    
            <FormItem
                {...formItemLayout}
                label="Slider"
            >
                {getFieldDecorator('slider')(
                <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
                )}
            </FormItem>
    
    
            <FormItem
                {...formItemLayout}
                label="Something"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 10 }}
            >
                {getFieldDecorator('radio-button')(
                <RadioGroup>
                    <RadioButton value="a">item 1</RadioButton>
                    <RadioButton value="b">item 2</RadioButton>
                    <RadioButton value="c">item 3</RadioButton>
                </RadioGroup>
                )}
            </FormItem>
    
            <FormItem
                {...formItemLayout}
                label="Rate"
            >
                {getFieldDecorator('rate', {
                initialValue: 2.5,

                })(
                <Rate allowHalf/>
                )}
            </FormItem>
    
    
            <FormItem
                wrapperCol={{ span: 12, offset: 6 }}
            >
                <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
        </Form>
      );
    }
  }
  
  export const WrappedDemo = Form.create()(Demo);