import React, { useState, useRef, useEffect, RefObject } from "react";
import { SyntheticEvent } from "react";
import { useAtom } from "jotai";
import { modalAtom } from "../atoms/modalAtom";

// Detects when user clicks outside of div
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) {}
