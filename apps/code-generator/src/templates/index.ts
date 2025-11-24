import type { TreeNode } from "../types";
import { nanoid } from "nanoid";

/**
 * 템플릿 타입
 */
export interface Template {
  id: string;
  name: string;
  category: "forms";
  description: string;
  thumbnail?: string;
  tree: TreeNode[];
}

/**
 * 로그인 폼 템플렛
 */
export const loginFormTemplate: Template = {
  id: "login-form",
  name: "Login Form",
  category: "forms",
  description: "이메일, 비밀번호 기반의 로그인 폼 템플릿입니다.",
  tree: [
    {
      id: nanoid(),
      componentName: "Section",
      props: { spacingScale: "sm" },
      children: [
        {
          id: nanoid(),
          componentName: "Stack",
          props: { spacing: 20, align: "stretch", direction: "column" },
          children: [
            {
              id: nanoid(),
              componentName: "Typography",
              props: { as: "h2", role: "headingXl", children: "Welcome!" },
              children: [],
            },
            {
              id: nanoid(),
              componentName: "FormField",
              props: { spacing: "normal", required: true },
              children: [
                {
                  id: nanoid(),
                  componentName: "FormLabel",
                  props: { required: true, children: "Email" },
                  children: [],
                },
                {
                  id: nanoid(),
                  componentName: "Input",
                  props: { type: "email", placeholder: "you@example.com" },
                  children: [],
                },
              ],
            },
            {
              id: nanoid(),
              componentName: "FormField",
              props: { spacing: "normal", required: true },
              children: [
                {
                  id: nanoid(),
                  componentName: "FormLabel",
                  props: { required: true, children: "Password" },
                  children: [],
                },
                {
                  id: nanoid(),
                  componentName: "Input",
                  props: { type: "password", placeholder: "••••••••" },
                  children: [],
                },
              ],
            },
            {
              id: nanoid(),
              componentName: "Stack",
              props: { direction: "column" },
              children: [
                {
                  id: nanoid(),
                  componentName: "Button",
                  props: {
                    color: "primary",
                    size: "lg",
                    fullWidth: true,
                    children: "Login",
                  },
                  children: [],
                },
                {
                  id: nanoid(),
                  componentName: "Button",
                  props: {
                    color: "tertiary",
                    size: "lg",
                    fullWidth: true,
                    children: "Sign In",
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * 연락처 템플릿
 */
export const contactFormTemplate: Template = {
  id: "contact-form",
  name: "Contact Form",
  category: "forms",
  description: "Simple 연락처 템플릿입니다.",
  tree: [
    {
      id: nanoid(),
      componentName: "Section",
      props: { spacingScale: "sm" },
      children: [
        {
          id: nanoid(),
          componentName: "Stack",
          props: { spacing: 20, align: "stretch", direction: "column" },
          children: [
            {
              id: nanoid(),
              componentName: "Typography",
              props: { as: "h2", role: "headingXl", children: "Get in Touch" },
              children: [],
            },
            {
              id: nanoid(),
              componentName: "FormField",
              props: {},
              children: [
                {
                  id: nanoid(),
                  componentName: "FormLabel",
                  props: { children: "Name" },
                  children: [],
                },
                {
                  id: nanoid(),
                  componentName: "Input",
                  props: { placeholder: "Your name" },
                  children: [],
                },
              ],
            },
            {
              id: nanoid(),
              componentName: "FormField",
              props: {},
              children: [
                {
                  id: nanoid(),
                  componentName: "FormLabel",
                  props: { children: "Email" },
                  children: [],
                },
                {
                  id: nanoid(),
                  componentName: "Input",
                  props: { type: "email", placeholder: "you@example.com" },
                  children: [],
                },
              ],
            },
            {
              id: nanoid(),
              componentName: "FormField",
              props: {},
              children: [
                {
                  id: nanoid(),
                  componentName: "FormLabel",
                  props: { children: "Message" },
                  children: [],
                },
                {
                  id: nanoid(),
                  componentName: "Textarea",
                  props: {
                    placeholder: "Your message...",
                    rows: 4,
                  },
                  children: [],
                },
              ],
            },
            {
              id: nanoid(),
              componentName: "Button",
              props: { variant: "primary", children: "Send Message" },
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

/**
 * 전체 템플릿 목록
 */
export const templates: Template[] = [loginFormTemplate, contactFormTemplate];

/**
 * 카테고리별 템플릿 가져오기
 */
export function getTemplatesByCategory(category: Template["category"]) {
  return templates.filter((t) => t.category === category);
}

/**
 * ID로 템플릿 가져오기
 */
export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}
