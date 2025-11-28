import React, { forwardRef, ComponentType } from 'react';
import { motion as motionOriginal, HTMLMotionProps, SVGMotionProps } from 'framer-motion';

type HTMLTags = keyof HTMLElementTagNameMap;
type SVGTags = keyof SVGElementTagNameMap;
type MotionElement = HTMLTags | SVGTags;

type ExtendedMotionProps<T extends MotionElement> = T extends SVGTags
  ? Omit<SVGMotionProps<T>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> & {
      className?: string;
      children?: React.ReactNode;
    }
  : T extends HTMLTags
  ? Omit<HTMLMotionProps<T>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> & {
      className?: string;
      children?: React.ReactNode;
    }
  : never;

// Create a motion component factory
// Helper function to filter out non-DOM props
const filterNonDOMProps = (props: any) => {
  const {
    jsx: _jsx,
    global: _global,
    forwardedRef,
    ...safeProps
  } = props;
  return safeProps;
};

const createMotionComponent = <T extends MotionElement>(tagName: T) => {
  type ElementType = T extends SVGTags ? SVGElement : T extends HTMLTags ? HTMLElement : never;
  type Props = T extends MotionElement ? ExtendedMotionProps<T> : never;
  
  const MotionComponent = (motionOriginal as any)[tagName] as React.ComponentType<any>;
  
  const Component = forwardRef<ElementType, Props>((props, ref) => {
    const safeProps = filterNonDOMProps(props);
    return <MotionComponent ref={ref} {...safeProps} />;
  });
  
  // Set display name for better debugging
  Component.displayName = `Motion${String(tagName).charAt(0).toUpperCase() + String(tagName).slice(1)}`;
  
  return Component;
};

// Create motion components for all needed HTML and SVG elements
export const motion = {
  // HTML Elements
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  button: createMotionComponent('button'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  p: createMotionComponent('p'),
  span: createMotionComponent('span'),
  a: createMotionComponent('a'),
  
  // SVG Elements
  svg: createMotionComponent('svg'),
  path: createMotionComponent('path'),
  circle: createMotionComponent('circle'),
  rect: createMotionComponent('rect'),
  g: createMotionComponent('g'),
  // Add more elements as needed
} as const;

export default motion;
