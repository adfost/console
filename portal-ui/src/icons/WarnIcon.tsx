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

import * as React from "react";

const WarnIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="#e04006"
        stroke-width="2"
      />
      <path fill="none" stroke="#e04006" stroke-width="2" d="M8 4v6m0 1v2" />
    </svg>
  );
};

export default WarnIcon;