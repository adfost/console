// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Grid from "@mui/material/Grid";
import get from "lodash/get";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  BucketObject,
  BucketObjectsList,
  RewindObject,
  RewindObjectList,
} from "./types";
import api from "../../../../../../common/api";
import TableWrapper from "../../../../Common/TableWrapper/TableWrapper";
import {
  decodeFileName,
  encodeFileName,
  niceBytes,
} from "../../../../../../common/utils";
import DeleteObject from "./DeleteObject";

import {
  actionsTray,
  containerForHeader,
  objectBrowserCommon,
  searchField,
} from "../../../../Common/FormComponents/common/styleLibrary";
import { Badge, Button, Typography } from "@mui/material";
import * as reactMoment from "react-moment";
import BrowserBreadcrumbs from "../../../../ObjectBrowser/BrowserBreadcrumbs";
import {
  resetRewind,
  setFileModeEnabled,
} from "../../../../ObjectBrowser/actions";
import { Route } from "../../../../ObjectBrowser/reducers";
import CreateFolderModal from "./CreateFolderModal";
import { download, extensionPreview, sortListObjects } from "../utils";
import {
  setErrorSnackMessage,
  setLoadingProgress,
  setSnackBarMessage,
} from "../../../../../../actions";
import { BucketInfo, BucketVersioning } from "../../../types";
import { ErrorResponseHandler } from "../../../../../../common/types";
import RewindEnable from "./RewindEnable";

import DeleteMultipleObjects from "./DeleteMultipleObjects";
import PreviewFileModal from "../Preview/PreviewFileModal";
import ScreenTitle from "../../../../Common/ScreenTitle/ScreenTitle";
import AddFolderIcon from "../../../../../../icons/AddFolderIcon";
import HistoryIcon from "../../../../../../icons/HistoryIcon";
import ObjectBrowserIcon from "../../../../../../icons/ObjectBrowserIcon";
import ObjectBrowserFolderIcon from "../../../../../../icons/ObjectBrowserFolderIcon";
import FolderIcon from "../../../../../../icons/FolderIcon";
import RefreshIcon from "../../../../../../icons/RefreshIcon";
import SearchIcon from "../../../../../../icons/SearchIcon";
import UploadIcon from "../../../../../../icons/UploadIcon";
import ShareFile from "../ObjectDetails/ShareFile";
import { setBucketDetailsLoad, setBucketInfo } from "../../../actions";
import { AppState } from "../../../../../../store";
import PageLayout from "../../../../Common/Layout/PageLayout";
import BoxIconButton from "../../../../Common/BoxIconButton/BoxIconButton";
import {
  DeleteIcon,
  FileBookIcon,
  FileCodeIcon,
  FileConfigIcon,
  FileDbIcon,
  FileFontIcon,
  FileImageIcon,
  FileLockIcon,
  FileMissingIcon,
  FileMusicIcon,
  FilePdfIcon,
  FilePptIcon,
  FileTxtIcon,
  FileVideoIcon,
  FileXlsIcon,
  FileZipIcon,
} from "../../../../../../icons";
import { IAM_SCOPES } from "../../../../../../common/SecureComponent/permissions";
import SecureComponent, {
  hasPermission,
} from "../../../../../../common/SecureComponent/SecureComponent";

const commonIcon = {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  width: 16,
  minWidth: 16,
  height: 40,
  marginRight: 10,
};

const styles = (theme: Theme) =>
  createStyles({
    seeMore: {
      marginTop: theme.spacing(3),
    },
    paper: {
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },

    addSideBar: {
      width: "320px",
      padding: "20px",
    },
    tableToolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(0),
    },
    minTableHeader: {
      color: "#393939",
      "& tr": {
        "& th": {
          fontWeight: "bold",
        },
      },
    },
    fileName: {
      display: "flex",
      alignItems: "center",
      "& .min-icon": {
        width: 16,
        height: 16,
        marginRight: 4,
      },
    },
    fileNameText: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    iconFolder: {
      backgroundImage: "url(/images/object-browser-folder-icn.svg)",
      backgroundSize: "auto",
      ...commonIcon,
    },
    iconFile: {
      backgroundImage: "url(/images/object-browser-icn.svg)",
      backgroundSize: "auto",
      ...commonIcon,
    },
    buttonsContainer: {
      "& .MuiButtonBase-root": {
        marginLeft: 10,
      },
    },
    browsePaper: {
      height: "calc(100vh - 280px)",
    },
    "@global": {
      ".rowLine:hover  .iconFileElm": {
        backgroundImage: "url(/images/ob_file_filled.svg)",
      },
      ".rowLine:hover  .iconFolderElm": {
        backgroundImage: "url(/images/ob_folder_filled.svg)",
      },
    },
    listButton: {
      marginLeft: "10px",
    },
    badgeOverlap: {
      "& .MuiBadge-badge": {
        top: 35,
        right: 10,
      },
    },
    ...actionsTray,
    ...searchField,
    ...objectBrowserCommon,
    ...containerForHeader(theme.spacing(4)),
  });

interface IListObjectsProps {
  classes: any;
  match: any;
  history: any;
  routesList: Route[];
  downloadingFiles: string[];
  rewindEnabled: boolean;
  rewindDate: any;
  bucketToRewind: string;
  setLoadingProgress: typeof setLoadingProgress;
  setSnackBarMessage: typeof setSnackBarMessage;
  setErrorSnackMessage: typeof setErrorSnackMessage;
  resetRewind: typeof resetRewind;
  setFileModeEnabled: typeof setFileModeEnabled;
  loadingBucket: boolean;
  setBucketInfo: typeof setBucketInfo;
  bucketInfo: BucketInfo | null;
  setBucketDetailsLoad: typeof setBucketDetailsLoad;
}

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef<Function | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback !== undefined && savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const defLoading = <Typography component="h3">Loading...</Typography>;

const ListObjects = ({
  classes,
  match,
  history,
  downloadingFiles,
  rewindEnabled,
  rewindDate,
  bucketToRewind,
  setLoadingProgress,
  setSnackBarMessage,
  setErrorSnackMessage,
  resetRewind,
  setFileModeEnabled,
  setBucketDetailsLoad,
  loadingBucket,
  setBucketInfo,
  bucketInfo,
}: IListObjectsProps) => {
  const [records, setRecords] = useState<BucketObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rewind, setRewind] = useState<RewindObject[]>([]);
  const [loadingRewind, setLoadingRewind] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteMultipleOpen, setDeleteMultipleOpen] = useState<boolean>(false);
  const [createFolderOpen, setCreateFolderOpen] = useState<boolean>(false);
  const [selectedObject, setSelectedObject] = useState<string>("");
  const [filterObjects, setFilterObjects] = useState<string>("");
  const [loadingStartTime, setLoadingStartTime] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] =
    useState<React.ReactNode>(defLoading);
  const [loadingVersioning, setLoadingVersioning] = useState<boolean>(true);
  const [isVersioned, setIsVersioned] = useState<boolean>(false);
  const [rewindSelect, setRewindSelect] = useState<boolean>(false);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [selectedPreview, setSelectedPreview] = useState<BucketObject | null>(
    null
  );
  const [shareFileModalOpen, setShareFileModalOpen] = useState<boolean>(false);
  const [sortDirection, setSortDirection] = useState<
    "ASC" | "DESC" | undefined
  >("ASC");
  const [currentSortField, setCurrentSortField] = useState<string>("name");
  const [iniLoad, setIniLoad] = useState<boolean>(false);

  const internalPaths = get(match.params, "subpaths", "");
  const bucketName = match.params["bucketName"];

  const fileUpload = useRef<HTMLInputElement>(null);

  const displayDeleteObject = hasPermission(bucketName, [
    IAM_SCOPES.S3_DELETE_OBJECT,
  ]);

  const displayListObjects = hasPermission(bucketName, [
    IAM_SCOPES.S3_LIST_BUCKET,
  ]);

  const updateMessage = () => {
    let timeDelta = Date.now() - loadingStartTime;

    if (timeDelta / 1000 >= 6) {
      setLoadingMessage(
        <React.Fragment>
          <Typography component="h3">
            This operation is taking longer than expected... (
            {Math.ceil(timeDelta / 1000)}s)
          </Typography>
        </React.Fragment>
      );
    } else if (timeDelta / 1000 >= 3) {
      setLoadingMessage(
        <Typography component="h3">
          This operation is taking longer than expected...
        </Typography>
      );
    }
  };

  useEffect(() => {
    if (!iniLoad) {
      setBucketDetailsLoad(true);
      setIniLoad(true);
    }
  }, [iniLoad, setBucketDetailsLoad, setIniLoad]);

  useInterval(() => {
    // Your custom logic here
    if (loading) {
      updateMessage();
    }
  }, 1000);

  useEffect(() => {
    if (loadingVersioning) {
      if (displayListObjects) {
        api
          .invoke("GET", `/api/v1/buckets/${bucketName}/versioning`)
          .then((res: BucketVersioning) => {
            setIsVersioned(res.is_versioned);
            setLoadingVersioning(false);
          })
          .catch((err: ErrorResponseHandler) => {
            setErrorSnackMessage(err);
            setLoadingVersioning(false);
          });
      } else {
        setLoadingVersioning(false);
      }
    }
  }, [bucketName, loadingVersioning, setErrorSnackMessage, displayListObjects]);

  // Rewind
  useEffect(() => {
    if (rewindEnabled) {
      if (bucketToRewind !== bucketName) {
        resetRewind();
        return;
      }

      if (rewindDate) {
        setLoadingRewind(true);
        const rewindParsed = rewindDate.toISOString();
        let pathPrefix = "";
        if (internalPaths) {
          const decodedPath = decodeFileName(internalPaths);
          pathPrefix = decodedPath.endsWith("/")
            ? decodedPath
            : decodedPath + "/";
        }
        api
          .invoke(
            "GET",
            `/api/v1/buckets/${bucketName}/rewind/${rewindParsed}${
              pathPrefix ? `?prefix=${encodeFileName(pathPrefix)}` : ``
            }`
          )
          .then((res: RewindObjectList) => {
            setLoadingRewind(false);
            if (res.objects) {
              setRewind(res.objects);
            } else {
              setRewind([]);
            }
          })
          .catch((err: ErrorResponseHandler) => {
            setLoadingRewind(false);
            setErrorSnackMessage(err);
          });
      }
    }
  }, [
    rewindEnabled,
    rewindDate,
    bucketToRewind,
    bucketName,
    match,
    setErrorSnackMessage,
    resetRewind,
    internalPaths,
  ]);

  useEffect(() => {
    setLoading(true);
  }, [internalPaths]);

  useEffect(() => {
    if (loading) {
      if (displayListObjects) {
        let pathPrefix = "";
        if (internalPaths) {
          const decodedPath = decodeFileName(internalPaths);
          pathPrefix = decodedPath.endsWith("/")
            ? decodedPath
            : decodedPath + "/";
        }

        let currentTimestamp = Date.now();
        setLoadingStartTime(currentTimestamp);
        setLoadingMessage(defLoading);
        api
          .invoke(
            "GET",
            `/api/v1/buckets/${bucketName}/objects${
              pathPrefix ? `?prefix=${encodeFileName(pathPrefix)}` : ``
            }`
          )
          .then((res: BucketObjectsList) => {
            const records: BucketObject[] = res.objects || [];
            const folders: BucketObject[] = [];
            const files: BucketObject[] = [];

            records.forEach((record) => {
              // this is a folder
              if (record.name.endsWith("/")) {
                folders.push(record);
              } else {
                // this is a file
                files.push(record);
              }
            });
            const recordsInElement = [...folders, ...files];
            setRecords(recordsInElement);
            // In case no objects were retrieved, We check if item is a file
            if (!res.objects && pathPrefix !== "") {
              if (rewindEnabled) {
                const rewindParsed = rewindDate.toISOString();

                let pathPrefix = "";
                if (internalPaths) {
                  const decodedPath = decodeFileName(internalPaths);
                  pathPrefix = decodedPath.endsWith("/")
                    ? decodedPath
                    : decodedPath + "/";
                }

                api
                  .invoke(
                    "GET",
                    `/api/v1/buckets/${bucketName}/rewind/${rewindParsed}${
                      pathPrefix ? `?prefix=${encodeFileName(pathPrefix)}` : ``
                    }`
                  )
                  .then((res: RewindObjectList) => {
                    //It is a file since it has elements in the object, setting file flag and waiting for component mount
                    if (res.objects === null) {
                      setFileModeEnabled(true);
                      setLoadingRewind(false);
                      setLoading(false);
                    } else {
                      // It is a folder, we remove loader
                      setLoadingRewind(false);
                      setLoading(false);
                      setFileModeEnabled(false);
                    }
                  })
                  .catch((err: ErrorResponseHandler) => {
                    setLoadingRewind(false);
                    setLoading(false);
                    setErrorSnackMessage(err);
                  });
              } else {
                api
                  .invoke(
                    "GET",
                    `/api/v1/buckets/${bucketName}/objects${
                      internalPaths ? `?prefix=${internalPaths}` : ``
                    }`
                  )
                  .then((res: BucketObjectsList) => {
                    //It is a file since it has elements in the object, setting file flag and waiting for component mount
                    if (!res.objects) {
                      // It is a folder, we remove loader
                      setFileModeEnabled(false);
                      setLoading(false);
                    } else {
                      // This is an empty folder.
                      if (
                        res.objects.length === 1 &&
                        res.objects[0].name.endsWith("/")
                      ) {
                        setFileModeEnabled(false);
                      } else {
                        setFileModeEnabled(true);
                      }

                      setLoading(false);
                    }
                  })
                  .catch((err: ErrorResponseHandler) => {
                    setLoading(false);
                    setErrorSnackMessage(err);
                  });
              }
            } else {
              setFileModeEnabled(false);
              setLoading(false);
            }
          })
          .catch((err: ErrorResponseHandler) => {
            setLoading(false);
            setErrorSnackMessage(err);
          });
      } else {
        setLoadingRewind(false);
        setLoading(false);
      }
    }
  }, [
    loading,
    match,
    setErrorSnackMessage,
    bucketName,
    rewindEnabled,
    rewindDate,
    internalPaths,
    setFileModeEnabled,
    bucketInfo,
    displayListObjects,
  ]);

  // bucket info
  useEffect(() => {
    if (loadingBucket) {
      api
        .invoke("GET", `/api/v1/buckets/${bucketName}`)
        .then((res: BucketInfo) => {
          setBucketDetailsLoad(false);
          setBucketInfo(res);
        })
        .catch((err: ErrorResponseHandler) => {
          setBucketDetailsLoad(false);
          setErrorSnackMessage(err);
        });
    }
  }, [
    bucketName,
    loadingBucket,
    setBucketDetailsLoad,
    setBucketInfo,
    setErrorSnackMessage,
  ]);

  const closeDeleteModalAndRefresh = (refresh: boolean) => {
    setDeleteOpen(false);

    if (refresh) {
      setSnackBarMessage(`Object '${selectedObject}' deleted successfully.`);
      setLoading(true);
    }
  };

  const closeDeleteMultipleModalAndRefresh = (refresh: boolean) => {
    setDeleteMultipleOpen(false);

    if (refresh) {
      setSnackBarMessage(`Objects deleted successfully.`);
      setSelectedObjects([]);
      setLoading(true);
    }
  };

  const closeAddFolderModal = () => {
    setCreateFolderOpen(false);
  };

  const upload = (e: any, bucketName: string, encodedPath: string) => {
    if (
      e === null ||
      e === undefined ||
      e.target === null ||
      e.target === undefined
    ) {
      return;
    }
    e.preventDefault();
    let files = e.target.files;
    let uploadUrl = `api/v1/buckets/${bucketName}/objects/upload`;
    if (encodedPath !== "") {
      uploadUrl = `${uploadUrl}?prefix=${encodedPath}`;
    }
    let xhr = new XMLHttpRequest();
    const areMultipleFiles = files.length > 1;
    const errorMessage = `An error occurred while uploading the file${
      areMultipleFiles ? "s" : ""
    }.`;
    const okMessage = `Object${
      areMultipleFiles ? "s" : ``
    } uploaded successfully.`;

    xhr.open("POST", uploadUrl, true);

    xhr.withCredentials = false;
    xhr.onload = function (event) {
      if (
        xhr.status === 401 ||
        xhr.status === 403 ||
        xhr.status === 400 ||
        xhr.status === 500
      ) {
        setSnackBarMessage(errorMessage);
      }
      if (xhr.status === 200) {
        setSnackBarMessage(okMessage);
      }
    };

    xhr.upload.addEventListener("error", (event) => {
      setSnackBarMessage(errorMessage);
    });

    xhr.upload.addEventListener("progress", (event) => {
      setLoadingProgress(Math.floor((event.loaded * 100) / event.total));
    });

    xhr.onerror = () => {
      setSnackBarMessage(errorMessage);
    };
    xhr.onloadend = () => {
      setLoading(true);
      setLoadingProgress(100);
    };

    const formData = new FormData();

    for (let file of files) {
      const fileName = file.name;
      const blobFile = new Blob([file], { type: file.type });
      formData.append(file.size, blobFile, fileName);
    }

    xhr.send(formData);
    e.target.value = null;
  };

  const displayParsedDate = (object: BucketObject) => {
    if (object.name.endsWith("/")) {
      return "";
    }
    return <reactMoment.default>{object.last_modified}</reactMoment.default>;
  };

  const displayNiceBytes = (object: BucketObject) => {
    if (object.name.endsWith("/")) {
      return "";
    }
    return niceBytes(String(object.size));
  };

  const confirmDeleteObject = (object: BucketObject) => {
    setDeleteOpen(true);
    setSelectedObject(object.name);
  };

  const displayDeleteFlag = (state: boolean) => {
    return state ? "Yes" : "No";
  };

  const downloadObject = (object: BucketObject) => {
    if (object.size > 104857600) {
      // If file is bigger than 100MB we show a notification
      setSnackBarMessage(
        "Download process started, it may take a few moments to complete"
      );
    }

    download(bucketName, encodeFileName(object.name), object.version_id);
  };

  const openPath = (idElement: string) => {
    const newPath = `/buckets/${bucketName}/browse${
      idElement ? `/${encodeFileName(idElement)}` : ``
    }`;
    history.push(newPath);
    return;
  };

  const uploadObject = (e: any): void => {
    let pathPrefix = "";
    if (internalPaths) {
      const decodedPath = decodeFileName(internalPaths);
      pathPrefix = decodedPath.endsWith("/") ? decodedPath : decodedPath + "/";
    }
    upload(e, bucketName, encodeFileName(pathPrefix));
  };

  const openPreview = (fileObject: BucketObject) => {
    setSelectedPreview(fileObject);
    setPreviewOpen(true);
  };

  const openShare = (fileObject: BucketObject) => {
    setSelectedPreview(fileObject);
    setShareFileModalOpen(true);
  };

  const closeShareModal = () => {
    setShareFileModalOpen(false);
    setSelectedPreview(null);
  };

  const tableActions = [
    { type: "view", onClick: openPath, sendOnlyId: true },
    {
      type: "preview",
      onClick: openPreview,
      disableButtonFunction: (item: string) =>
        extensionPreview(item) === "none",
    },
    {
      type: "share",
      onClick: openShare,
      disableButtonFunction: (item: string) => item.endsWith("/"),
    },
    {
      type: "download",
      onClick: downloadObject,
      showLoaderFunction: (item: string) =>
        downloadingFiles.includes(`${match.params["bucket"]}/${item}`),
      disableButtonFunction: (item: string) => {
        if (rewindEnabled) {
          const element = rewind.find((elm) => elm.name === item);

          if (element && element.delete_flag) {
            return true;
          }
        }
        return false;
      },
      sendOnlyId: false,
    },
  ];

  if (displayDeleteObject) {
    tableActions.push({
      type: "delete",
      onClick: confirmDeleteObject,
      disableButtonFunction: () => {
        return rewindEnabled;
      },
    });
  }

  const displayName = (element: string) => {
    let elementString = element;
    let icon = <ObjectBrowserIcon />;
    // Element is a folder
    if (element.endsWith("/")) {
      icon = <ObjectBrowserFolderIcon />;
      elementString = element.substr(0, element.length - 1);
    }

    interface IExtToIcon {
      icon: any;
      extensions: string[];
    }

    const extensionToIcon: IExtToIcon[] = [
      {
        icon: <FileVideoIcon />,
        extensions: ["mp4", "mov", "avi", "mpeg", "mpg"],
      },
      {
        icon: <FileMusicIcon />,
        extensions: ["mp3", "m4a", "aac"],
      },
      {
        icon: <FilePdfIcon />,
        extensions: ["pdf"],
      },
      {
        icon: <FilePptIcon />,
        extensions: ["ppt", "pptx"],
      },
      {
        icon: <FileXlsIcon />,
        extensions: ["xls", "xlsx"],
      },
      {
        icon: <FileLockIcon />,
        extensions: ["cer", "crt", "pem"],
      },
      {
        icon: <FileCodeIcon />,
        extensions: [
          "html",
          "xml",
          "css",
          "py",
          "go",
          "php",
          "cpp",
          "h",
          "java",
        ],
      },
      {
        icon: <FileConfigIcon />,
        extensions: ["cfg", "yaml"],
      },
      {
        icon: <FileDbIcon />,
        extensions: ["sql"],
      },
      {
        icon: <FileFontIcon />,
        extensions: ["ttf", "otf"],
      },
      {
        icon: <FileTxtIcon />,
        extensions: ["txt"],
      },
      {
        icon: <FileZipIcon />,
        extensions: ["zip", "rar", "tar", "gz"],
      },
      {
        icon: <FileBookIcon />,
        extensions: ["epub", "mobi", "azw", "azw3"],
      },
      {
        icon: <FileImageIcon />,
        extensions: ["jpeg", "jpg", "gif", "tiff", "png", "heic", "dng"],
      },
    ];
    const lowercaseElement = element.toLowerCase();
    for (const etc of extensionToIcon) {
      for (const ext of etc.extensions) {
        if (lowercaseElement.endsWith(`.${ext}`)) {
          icon = etc.icon;
        }
      }
    }

    if (!element.endsWith("/") && element.indexOf(".") < 0) {
      icon = <FileMissingIcon />;
    }

    const splitItem = elementString.split("/");

    return (
      <div className={classes.fileName}>
        {icon}
        <span className={classes.fileNameText}>
          {splitItem[splitItem.length - 1]}
        </span>
      </div>
    );
  };

  const filteredRecords = records.filter((b: BucketObject) => {
    if (filterObjects === "") {
      return true;
    } else {
      const objectName = b.name.toLowerCase();
      if (objectName.indexOf(filterObjects.toLowerCase()) >= 0) {
        return true;
      } else {
        return false;
      }
    }
  });

  const rewindCloseModal = (refresh: boolean) => {
    setRewindSelect(false);
  };

  const closePreviewWindow = () => {
    setPreviewOpen(false);
    setSelectedPreview(null);
  };

  const selectListObjects = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetD = e.target;
    const value = targetD.value;
    const checked = targetD.checked;

    let elements: string[] = [...selectedObjects]; // We clone the selectedBuckets array

    if (checked) {
      // If the user has checked this field we need to push this to selectedBucketsList
      elements.push(value);
    } else {
      // User has unchecked this field, we need to remove it from the list
      elements = elements.filter((element) => element !== value);
    }
    setSelectedObjects(elements);

    return elements;
  };

  const sortChange = (sortData: any) => {
    const newSortDirection = get(sortData, "sortDirection", "DESC");
    setCurrentSortField(sortData.sortBy);
    setSortDirection(newSortDirection);
    setLoading(true);
  };

  const listModeColumns = [
    {
      label: "Name",
      elementKey: "name",
      renderFunction: displayName,
      enableSort: true,
    },
    {
      label: "Last Modified",
      elementKey: "last_modified",
      renderFunction: displayParsedDate,
      renderFullObject: true,
      enableSort: true,
    },
    {
      label: "Size",
      elementKey: "size",
      renderFunction: displayNiceBytes,
      renderFullObject: true,
      width: 60,
      contentTextAlign: "right",
      enableSort: true,
    },
  ];

  const rewindModeColumns = [
    {
      label: "Name",
      elementKey: "name",
      renderFunction: displayName,
      enableSort: true,
    },
    {
      label: "Object Date",
      elementKey: "last_modified",
      renderFunction: displayParsedDate,
      renderFullObject: true,
      enableSort: true,
    },
    {
      label: "Size",
      elementKey: "size",
      renderFunction: displayNiceBytes,
      renderFullObject: true,
      width: 60,
      contentTextAlign: "right",
      enableSort: true,
    },
    {
      label: "Deleted",
      elementKey: "delete_flag",
      renderFunction: displayDeleteFlag,
      width: 60,
      contentTextAlign: "center",
    },
  ];

  const pageTitle = decodeFileName(internalPaths);
  const currentPath = pageTitle.split("/").filter((i: string) => i !== "");

  const plSelect = rewindEnabled ? rewind : filteredRecords;

  const sortASC = plSelect.sort(sortListObjects(currentSortField));

  let payload = [];

  if (sortDirection === "ASC") {
    payload = sortASC;
  } else {
    payload = sortASC.reverse();
  }

  return (
    <React.Fragment>
      {shareFileModalOpen && selectedPreview && (
        <ShareFile
          open={shareFileModalOpen}
          closeModalAndRefresh={closeShareModal}
          bucketName={bucketName}
          dataObject={{
            name: selectedPreview.name,
            last_modified: "",
            version_id: selectedPreview.version_id,
          }}
        />
      )}
      {deleteOpen && (
        <DeleteObject
          deleteOpen={deleteOpen}
          selectedBucket={bucketName}
          selectedObject={encodeFileName(selectedObject)}
          closeDeleteModalAndRefresh={closeDeleteModalAndRefresh}
        />
      )}
      {deleteMultipleOpen && (
        <DeleteMultipleObjects
          deleteOpen={deleteMultipleOpen}
          selectedBucket={bucketName}
          selectedObjects={selectedObjects}
          closeDeleteModalAndRefresh={closeDeleteMultipleModalAndRefresh}
        />
      )}
      {createFolderOpen && (
        <CreateFolderModal
          modalOpen={createFolderOpen}
          bucketName={bucketName}
          folderName={internalPaths}
          onClose={closeAddFolderModal}
        />
      )}
      {rewindSelect && (
        <RewindEnable
          open={rewindSelect}
          closeModalAndRefresh={rewindCloseModal}
          bucketName={bucketName}
        />
      )}
      {previewOpen && (
        <PreviewFileModal
          open={previewOpen}
          bucketName={bucketName}
          object={selectedPreview}
          onClosePreview={closePreviewWindow}
        />
      )}

      <PageLayout>
        <Grid item xs={12}>
          <ScreenTitle
            icon={
              <Fragment>
                <FolderIcon width={40} />
              </Fragment>
            }
            title={
              currentPath.length > 0 ? currentPath[currentPath.length - 1] : "/"
            }
            subTitle={
              <Fragment>
                <BrowserBreadcrumbs
                  bucketName={bucketName}
                  internalPaths={pageTitle}
                />
              </Fragment>
            }
            actions={
              <Fragment>
                <SecureComponent
                  resource={bucketName}
                  scopes={[IAM_SCOPES.S3_PUT_OBJECT]}
                >
                  <BoxIconButton
                    tooltip={"Choose or create a new path"}
                    color="primary"
                    aria-label="Add a new folder"
                    onClick={() => {
                      setCreateFolderOpen(true);
                    }}
                    disabled={rewindEnabled}
                    size="large"
                  >
                    <AddFolderIcon />
                  </BoxIconButton>
                  <BoxIconButton
                    tooltip={"Upload file"}
                    color="primary"
                    aria-label="Refresh List"
                    onClick={() => {
                      if (fileUpload && fileUpload.current) {
                        fileUpload.current.click();
                      }
                    }}
                    disabled={rewindEnabled}
                    size="large"
                  >
                    <UploadIcon />
                  </BoxIconButton>
                  <input
                    type="file"
                    multiple={true}
                    onChange={(e) => uploadObject(e)}
                    id="file-input"
                    style={{ display: "none" }}
                    ref={fileUpload}
                  />
                </SecureComponent>
                <Badge
                  badgeContent=" "
                  color="secondary"
                  variant="dot"
                  invisible={!rewindEnabled}
                  className={classes.badgeOverlap}
                >
                  <BoxIconButton
                    tooltip={"Rewind"}
                    color="primary"
                    aria-label="Rewind"
                    onClick={() => {
                      setRewindSelect(true);
                    }}
                    disabled={!isVersioned}
                    size="large"
                  >
                    <HistoryIcon />
                  </BoxIconButton>
                </Badge>
                <BoxIconButton
                  tooltip={"Refresh list"}
                  color="primary"
                  aria-label="Refresh List"
                  onClick={() => {
                    setLoading(true);
                  }}
                  disabled={rewindEnabled}
                  size="large"
                  variant={"contained"}
                >
                  <RefreshIcon />
                </BoxIconButton>
              </Fragment>
            }
          />
        </Grid>
        <Grid item xs={12} className={classes.actionsTray}>
          <SecureComponent
            scopes={[IAM_SCOPES.S3_LIST_BUCKET]}
            resource={bucketName}
          >
            <TextField
              placeholder="Search Objects"
              className={classes.searchField}
              id="search-resource"
              label=""
              onChange={(val) => {
                setFilterObjects(val.target.value);
              }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </SecureComponent>
          <SecureComponent
            scopes={[IAM_SCOPES.S3_DELETE_OBJECT]}
            resource={bucketName}
          >
            <Button
              variant="contained"
              color="primary"
              endIcon={<DeleteIcon />}
              onClick={() => {
                setDeleteMultipleOpen(true);
              }}
              disabled={selectedObjects.length === 0}
            >
              Delete Selected
            </Button>
          </SecureComponent>
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
        <Grid item xs={12}>
          <SecureComponent
            scopes={[IAM_SCOPES.S3_LIST_BUCKET]}
            resource={bucketName}
            errorProps={{ disabled: true }}
          >
            <TableWrapper
              itemActions={tableActions}
              columns={rewindEnabled ? rewindModeColumns : listModeColumns}
              isLoading={rewindEnabled ? loadingRewind : loading}
              loadingMessage={loadingMessage}
              entityName="Objects"
              idField="name"
              records={payload}
              customPaperHeight={classes.browsePaper}
              selectedItems={selectedObjects}
              onSelect={selectListObjects}
              customEmptyMessage={`This location is empty${
                !rewindEnabled ? ", please try uploading a new file" : ""
              }`}
              sortConfig={{
                currentSort: currentSortField,
                currentDirection: sortDirection,
                triggerSort: sortChange,
              }}
            />
          </SecureComponent>
        </Grid>
      </PageLayout>
    </React.Fragment>
  );
};

const mapStateToProps = ({ objectBrowser, buckets }: AppState) => ({
  routesList: get(objectBrowser, "routesList", []),
  downloadingFiles: get(objectBrowser, "downloadingFiles", []),
  rewindEnabled: get(objectBrowser, "rewind.rewindEnabled", false),
  rewindDate: get(objectBrowser, "rewind.dateToRewind", null),
  bucketToRewind: get(objectBrowser, "rewind.bucketToRewind", ""),
  loadingBucket: buckets.bucketDetails.loadingBucket,
  bucketInfo: buckets.bucketDetails.bucketInfo,
});

const mapDispatchToProps = {
  setLoadingProgress,
  setSnackBarMessage,
  setErrorSnackMessage,
  setFileModeEnabled,
  resetRewind,
  setBucketDetailsLoad,
  setBucketInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(withStyles(styles)(ListObjects)));
