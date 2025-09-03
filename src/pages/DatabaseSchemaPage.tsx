import React, { useState, useEffect, useRef } from 'react';
import { db } from '../db/db';
import DatabaseDiagram from '../components/DatabaseDiagram';

interface TableInfo {
  name: string;
  fields: Field[];
  indices: string[];
  recordCount: number;
}

interface Field {
  name: string;
  type: string;
  optional: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  foreignKeyTable?: string;
}

const schemaDefinition: Record<string, Field[]> = {
  cards: [
    { name: 'id', type: 'string', optional: false, isPrimaryKey: true, isForeignKey: false },
    { name: 'label', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'trumpNumber', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'image', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'pathA', type: 'number', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'pathB', type: 'number', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'hebrewLetter', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'hebrewName', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'element', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'pathNumber', type: 'number', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'note', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
  ],
  sephirot: [
    { name: 'id', type: 'number', optional: false, isPrimaryKey: true, isForeignKey: false },
    { name: 'key', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'title', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'meaning', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'symbols', type: 'string[]', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'sources', type: '{label, url}[]', optional: true, isPrimaryKey: false, isForeignKey: false },
  ],
  minorCards: [
    { name: 'id', type: 'string', optional: false, isPrimaryKey: true, isForeignKey: false },
    { name: 'label', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'suit', type: 'Wands|Cups|Swords|Disks', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'rank', type: 'Ace|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'image', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'nodeId', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'sephirot' },
  ],
  symbols: [
    { name: 'id', type: 'string', optional: false, isPrimaryKey: true, isForeignKey: false },
    { name: 'label', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'type', type: 'card|figure|animal|plant|celestial|object|architectural|geometric|color|number|element', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'description', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'meanings', type: 'string[]', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'traditions', type: 'string[]', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'category', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'difficulty', type: 'easy|medium|hard', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'source', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
  ],
  cardAppearances: [
    { name: 'id', type: 'number', optional: true, isPrimaryKey: true, isForeignKey: false },
    { name: 'symbolId', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'symbols' },
    { name: 'cardId', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'cards' },
    { name: 'x', type: 'number', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'y', type: 'number', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'prominence', type: 'primary|secondary|background', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'variant', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
  ],
  relationships: [
    { name: 'id', type: 'number', optional: true, isPrimaryKey: true, isForeignKey: false },
    { name: 'sourceId', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'symbols' },
    { name: 'targetId', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'symbols' },
    { name: 'type', type: 'contains|opposes|transforms_into|balances|derives_from|corresponds|evolution|mirrors|complements|shares_element|numerological|geometric|alchemical|kabbalistic', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'strength', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'description', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'bidirectional', type: 'boolean', optional: false, isPrimaryKey: false, isForeignKey: false },
  ],
  cardMeanings: [
    { name: 'id', type: 'number', optional: true, isPrimaryKey: true, isForeignKey: false },
    { name: 'cardId', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'cards' },
    { name: 'title', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'meaning', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'keywords', type: 'string[]', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'essay', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
    { name: 'sources', type: '{label, url}[]', optional: true, isPrimaryKey: false, isForeignKey: false },
  ],
  symbolDetails: [
    { name: 'id', type: 'number', optional: true, isPrimaryKey: true, isForeignKey: false },
    { name: 'cardMeaningId', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'cardMeanings' },
    { name: 'name', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'note', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
  ],
  hotspots: [
    { name: 'id', type: 'number', optional: true, isPrimaryKey: true, isForeignKey: false },
    { name: 'cardId', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'cards' },
    { name: 'symbolId', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'symbols' },
    { name: 'x', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'y', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'width', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'height', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'label', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'meaning', type: 'string', optional: true, isPrimaryKey: false, isForeignKey: false },
  ],
  geometries: [
    { name: 'id', type: 'string', optional: false, isPrimaryKey: true, isForeignKey: false },
    { name: 'data', type: 'any', optional: false, isPrimaryKey: false, isForeignKey: false },
  ],
  decans: [
    { name: 'id', type: 'string', optional: false, isPrimaryKey: true, isForeignKey: false },
    { name: 'position', type: 'number', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'sign', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'degreeRange', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'planet', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
    { name: 'minorCard', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: true, foreignKeyTable: 'minorCards' },
    { name: 'dates', type: 'string', optional: false, isPrimaryKey: false, isForeignKey: false },
  ],
};

const indexDefinition: Record<string, string[]> = {
  cards: ['id', 'trumpNumber', 'hebrewLetter', 'element', 'pathA', 'pathB'],
  sephirot: ['id', 'key'],
  minorCards: ['id', 'suit', 'rank', 'nodeId'],
  symbols: ['id', 'type', 'category', 'difficulty'],
  cardAppearances: ['++id', 'symbolId', 'cardId', '[symbolId+cardId]'],
  relationships: ['++id', 'sourceId', 'targetId', 'type', '[sourceId+targetId]'],
  cardMeanings: ['++id', 'cardId', 'title'],
  symbolDetails: ['++id', 'cardMeaningId'],
  hotspots: ['++id', 'cardId', 'symbolId', '[cardId+symbolId]'],
  geometries: ['id'],
  decans: ['id', 'position', 'sign', 'planet', 'minorCard'],
};

export default function DatabaseSchemaPage() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const [totalRecords, setTotalRecords] = useState(0);
  const [highlightedTable, setHighlightedTable] = useState<string | null>(null);
  const tableRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    loadTableInfo();
  }, []);

  const loadTableInfo = async () => {
    const tableNames = Object.keys(schemaDefinition);
    const tableInfos: TableInfo[] = [];
    let total = 0;

    for (const tableName of tableNames) {
      const count = await (db as any)[tableName].count();
      total += count;
      
      tableInfos.push({
        name: tableName,
        fields: schemaDefinition[tableName],
        indices: indexDefinition[tableName] || [],
        recordCount: count,
      });
    }

    setTables(tableInfos);
    setTotalRecords(total);
  };

  const toggleTable = (tableName: string) => {
    setExpandedTables(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tableName)) {
        newSet.delete(tableName);
      } else {
        newSet.add(tableName);
      }
      return newSet;
    });
  };

  const getRelationships = () => {
    const relationships: Array<{ from: string; to: string; field: string }> = [];
    
    for (const [tableName, fields] of Object.entries(schemaDefinition)) {
      for (const field of fields) {
        if (field.isForeignKey && field.foreignKeyTable) {
          relationships.push({
            from: tableName,
            to: field.foreignKeyTable,
            field: field.name,
          });
        }
      }
    }
    
    return relationships;
  };

  const handleNodeClick = (tableName: string) => {
    // Scroll to the table card and highlight it
    const tableElement = tableRefs.current[tableName];
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedTable(tableName);
      
      // Remove highlight after animation
      setTimeout(() => {
        setHighlightedTable(null);
      }, 2000);
    }
  };

  const getRecordCounts = () => {
    const counts: Record<string, number> = {};
    tables.forEach(table => {
      counts[table.name] = table.recordCount;
    });
    return counts;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Database Schema</h1>
      
      {/* Visual Database Diagram */}
      <DatabaseDiagram 
        relationships={getRelationships()}
        recordCounts={getRecordCounts()}
        onNodeClick={handleNodeClick}
      />
      
      <div data-testid="db-statistics" className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Database Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">11</div>
            <div className="text-sm text-gray-400">Total Tables: 11</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{totalRecords}</div>
            <div className="text-sm text-gray-400">Total Records: {totalRecords}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{Object.values(indexDefinition).flat().length}</div>
            <div className="text-sm text-gray-400">Total Indices</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{getRelationships().length}</div>
            <div className="text-sm text-gray-400">Relationships</div>
          </div>
        </div>
      </div>

      <div className="schema-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
        {tables.map(table => (
          <div
            key={table.name}
            ref={el => tableRefs.current[table.name] = el}
            data-table={table.name}
            className={`bg-gray-800 rounded-lg cursor-pointer transition-all hover:shadow-xl ${
              highlightedTable === table.name ? 'highlight-animation ring-4 ring-blue-500' : ''
            }`}
            onClick={() => toggleTable(table.name)}
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-blue-400">{table.name}</h3>
                <span className="record-count text-sm text-gray-400">
                  {table.recordCount} records
                </span>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {table.indices.slice(0, 3).map(index => (
                    <span key={index} className="text-xs bg-blue-900 px-2 py-1 rounded">
                      {index}
                    </span>
                  ))}
                  {table.indices.length > 3 && (
                    <span className="text-xs text-gray-500">+{table.indices.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
            
            {expandedTables.has(table.name) && (
              <div className="p-4 space-y-2">
                {table.fields.map(field => (
                  <div
                    key={field.name}
                    data-field={field.name}
                    className="flex items-center justify-between py-1 border-b border-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {field.name}{field.optional ? '?' : ''}: {field.type}
                      </span>
                      {field.isPrimaryKey && (
                        <span className="index-badge text-xs bg-yellow-600 text-white px-1.5 py-0.5 rounded">
                          PK
                        </span>
                      )}
                      {table.indices.includes(field.name) && !field.isPrimaryKey && (
                        <span className="index-badge text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded">
                          IDX
                        </span>
                      )}
                    </div>
                    {field.isForeignKey && (
                      <span className="text-xs text-green-400">
                        FK → {field.foreignKeyTable}.id
                      </span>
                    )}
                  </div>
                ))}
                
                {table.indices.filter(idx => idx.includes('[')).map(compoundIdx => (
                  <div key={compoundIdx} className="mt-2 pt-2 border-t border-gray-700">
                    <span className="text-xs text-gray-400">Compound Index: </span>
                    <span className="text-xs font-mono text-blue-400">{compoundIdx}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Table Relationships</h2>
        <div className="space-y-2">
          {getRelationships().map((rel, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <span className="text-blue-400">{rel.from}</span>
              <span className="text-gray-500">→</span>
              <span className="text-green-400">{rel.to}</span>
              <span className="text-gray-600 text-xs ml-2">({rel.field})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}