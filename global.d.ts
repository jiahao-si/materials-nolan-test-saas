import * as React from 'react';
import { JSONSchema6Definition } from 'json-schema';
import { CommonStyle } from './style';

/**
 * @desc Common Define
 */
export type Function<T = any> = (...params: any[]) => T;

export interface JsonSchemaProperties {
  [k: string]: JSONSchema6Definition;
}

/**
 * @desc Form
 */
interface ConnectedProps {
  UForm: React.ComponentType;
  SchemaForm: React.ComponentType;
}

type Connect = (
  Component: React.ComponentType<object>
) => React.ComponentType<object & ConnectedProps>;

interface FormParams extends ConnectedProps {
  connect: Connect;
}

export interface IOverrideFormProps {
  value: object;
  onChange: (value: object) => void;
}

export type OverrideFormType = (params: FormParams) => React.ComponentType<IOverrideFormProps>;

/**
 * @desc Component
 */
export interface EditorComponentInfo {
  name: string;
  desc: string;
  author: string;
}

export interface EditorComponentProps {
  data: object;
  style: object;
}

export interface CustomComponentEvent {
  eventName: string;
  name: string;
}

export interface EditorComponent {
  name: string;
  info: EditorComponentInfo;
  dataForm?: JsonSchemaProperties | OverrideFormType;
  styleForm?: JsonSchemaProperties | OverrideFormType;
  enableStyleGroup?: CommonStyle | '*';
  runtime?: 'jimu' | 'vue' | 'react';
  events?: CustomComponentEvent[];
  isContainer?: boolean;
  __isBuildIn?: true;
  __implementHotArea?: true;
}

/**
 * @desc Plugin
 */
export interface EditorPluginInfo {
  name: string;
  desc: string;
  author: string;
}

export interface EditorPlugin {
  info: EditorPluginInfo;
  dataForm?: JsonSchemaProperties | OverrideFormType;
}

/**
 * @desc Action
 */
export interface EditorActionInfo {
  name: string;
  author: string;
}

export interface EditorAction {
  info: EditorPluginInfo;
  dataForm?: JsonSchemaProperties;
}

/**
 * @desc Style
 */
export type StyleGroup = CommonStyle;
